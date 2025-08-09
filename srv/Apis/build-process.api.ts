import { InvoiceOutput } from '../Types/build-process';
import { DocJobResponse } from "../Types/doc_info-exta";
import {
  Service,
  ActionReturn
} from '@dxfrontier/cds-ts-dispatcher';

import cds from '@sap/cds';

export default class BuildProcessApis {
  private buildProcess: Service

  constructor() {
    this.connectBuildProcess();
  }

  async connectBuildProcess(): Promise<Service> {
    return this.buildProcess = await cds.connect.to('BuildProcess');
  }

  async WorkflowTrigger(data: InvoiceOutput) {
    let payload = {
      "definitionId": "us10.080aac49trial.apitrigger.invoiceDetailsProcessing",
      "context": {
        ...data
      }
    }

    try {

      const response = await this.buildProcess.send('POST', '/v1/workflow-instances', JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}