const FormData = require('form-data');
import * as fs from 'fs';
import * as path from 'path';
import { DocJobResponse } from "../Types/doc_info-exta";
import { attachments } from "../Types/Gamil";
import cds from '@sap/cds';
import {
  Service,
  ActionReturn
} from '@dxfrontier/cds-ts-dispatcher';

export default class DocInfoExtractionApis {
  private docInfoExtraction: Service

  constructor() {
    this.connectDocInfoExtraction();
  }

  async connectDocInfoExtraction(): Promise<Service> {
    return this.docInfoExtraction = await cds.connect.to('DocInfoExtraction');
  }

  async capabilities():Promise<any> {
    try {
      const response = await this.docInfoExtraction.send('GET', '/capabilities');
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }

  }
  async uploadDocument(attachments: attachments[]){
    let responseArray: DocJobResponse[] = []
    for (const attachment of attachments) {
      const buffer = fs.readFileSync(attachment.filePath);

      const formData = new FormData();
      formData.append('file', buffer, attachment.filename);
      formData.append('options', JSON.stringify({ "clientId": "default", "schemaName": "SAP_invoice_schema" }));

      try {
        const response = this.docInfoExtraction.send('POST', '/document/jobs', formData, {
          headers: formData.getHeaders()
        });
        console.log(response);
        responseArray.push(response);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    return responseArray
  }

  async jobStatus(jobId: string) {
    try {
      const response = await this.docInfoExtraction.send('GET','/document/jobs/' + jobId);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};