const FormData = require('form-data');
import * as fs from 'fs';
import * as path from 'path';
import { DocJobResponse } from "../Types/doc_info-exta";
import { attachments } from "../Types/Gamil";
import cds from '@sap/cds';
// const cdse = require('cdse');
const cdsapi = require("@sapmentors/cds-scp-api");
import {
  Service,
  ActionReturn
} from '@dxfrontier/cds-ts-dispatcher';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
export default class DocInfoExtractionApis {
  private docInfoExtraction: Service

  constructor() {
    this.connectDocInfoExtraction();
  }

  async connectDocInfoExtraction(): Promise<Service> {
    // return this.docInfoExtraction = await cdsapi.connect.to('DocInfoExtraction');
    return this.docInfoExtraction = await cdsapi.connect.to('sap_doc_info_extract_dest');
  }

  async capabilities(): Promise<any> {
    try {
      // const response = await this.docInfoExtraction.send('GET', '/capabilities');
      const response = await this.docInfoExtraction.run({
          method: 'GET',
          url: '/capabilities',
        
        });
      return response;
    } catch (error: any) {
      console.log(error);
      return error.reason.response.body;
    }
  }

  async uploadDocument(attachments: attachments[]) {
    let responseArray: DocJobResponse[] = []
    for (const attachment of attachments) {
      const buffer = fs.readFileSync(attachment.filePath);

      const formData = new FormData();
      formData.append('file', buffer, attachment.filename);
      formData.append('options', JSON.stringify({ "clientId": "default", "schemaName": "SAP_invoice_schema" }));

      try {
        // const response = await this.docInfoExtraction.send('POST', '/document/jobs', formData, {
        //   headers: formData.getHeaders()
        // });
        // responseArray.push(response);
        const response = await this.docInfoExtraction.send({
          method: 'POST',
          url: '/document/jobs',
          data: formData,
          headers: formData.getHeaders()
        });

        responseArray.push(response);

        // const response = await executeHttpRequest({ destinationName: 'sap_doc_info_extract_dest' }, {
        //   method: 'POST',
        //   url: '/document/jobs',
        //   data: formData,
        //   headers: formData.getHeaders()
        // });
        // responseArray.push(response.data);

        console.log(response);
      } catch (error: any) {
        console.log(error);
        return error
      }
    }
    return responseArray
  }

  async jobStatus(jobId: string) {
    try {
      const response = await this.docInfoExtraction.send('GET', '/document/jobs/' + jobId);
      return response;
    } catch (error: any) {
      console.log(error);
      return error.reason.response.body;
    }
  }
};