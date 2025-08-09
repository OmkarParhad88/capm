import {
  Request,
  ServiceLogic,
  Inject,
  ActionReturn,
  CatchAndSetErrorMessage
} from '@dxfrontier/cds-ts-dispatcher';
import NorthWindApis from '../Apis/northwind.api';
import DocInfoExtractionApis from '../Apis/doc-info-exta.api';
import type { Products } from '#cds-models/DemoService';
import { job, capabilities } from '#cds-models/InvoiceFlowService';

import GmailApis from '../Apis/mail-pulling.api';
import { DocInfoExtractionRequest, DocJobResponse, withEmaiData } from '../Types/doc_info-exta';
import { InvoiceOutput, WorkflowTriggerResponse } from '../Types/build-process';
import {  extractInvoiceData } from '../Utils';
import  BuildProcessApis  from '../Apis/build-process.api';

@ServiceLogic()
export default class UnBoundedService {
  @Inject(NorthWindApis) private readonly northWindApis: NorthWindApis;
  @Inject(DocInfoExtractionApis) private readonly docInfoExtractionApis: DocInfoExtractionApis;
  @Inject(GmailApis) private readonly gmailApi: GmailApis;
  @Inject(BuildProcessApis) private readonly buildProcessApi: BuildProcessApis;

  public async getProducts(): ActionReturn<typeof job> {
    return await this.northWindApis.getProducts();
  }
  public async doJob(): ActionReturn<typeof job> {
     let docJobResponse: withEmaiData[][] = [];
        let responseArray: WorkflowTriggerResponse[] = [];
        const messages = await this.gmailApi.fetchLatestEmailAttachments();
        for (const message of messages) {
          // console.log(message);
    
          let JobResponse: DocJobResponse[] = await this.docInfoExtractionApis.uploadDocument(message.attachments);
          let withEmailData: withEmaiData[] = [];
          withEmailData.push({
            from: message.from,
            name: message.name,
            subject: message.subject,
            date: message.date,
            body: message.body,
            docJobResponses: JobResponse,
          });
    
          docJobResponse.push(withEmailData);
        }
        for (const response of docJobResponse) {
          // console.log(response);
          for (const massage of response) {
            // console.log(massage);
    
            for (let i = 0; i < massage.docJobResponses.length; i++) {
              let job = massage.docJobResponses[i];
              // massage.docJobResponses.forEach(async (job: DocJobResponse | DocInfoExtractionRequest, index: number) => {
              let status = job.status;
              let response: DocInfoExtractionRequest = {} as DocInfoExtractionRequest;
    
              while (status !== "DONE" && status !== "FAILED") {
                response = await this.docInfoExtractionApis.jobStatus(job.id);
                status = response.status;
    
                if (status !== "DONE" && status !== "FAILED") {
                  await new Promise(resolve => setTimeout(resolve, 4000));
                }
              }
    
              if (status === "DONE") {
                console.log(response)
                massage.docJobResponses[i] = response;
    
                let docData: InvoiceOutput = extractInvoiceData(response);
                let res = await this.buildProcessApi.WorkflowTrigger(docData);
                if (res || res.status === "RUNNING") {
                  responseArray.push(res);
                }
              } else if (status === "FAILED") {
                console.log(`❌ Job ${job.id} failed.`);
              }
            }
          }
        }
        return responseArray
  }

  
  public async getCapabilities(): ActionReturn<typeof capabilities> {
    return await this.docInfoExtractionApis.capabilities();
  }
}