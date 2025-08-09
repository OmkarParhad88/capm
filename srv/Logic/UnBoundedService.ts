import {
  Request,
  ServiceLogic,
  Inject,
  ActionReturn
} from '@dxfrontier/cds-ts-dispatcher';
import NorthWindApis from '../Apis/northwind.api';
import DocInfoExtractionApis from '../Apis/doc-info-exta.api';
import type { Products } from '#cds-models/DemoService';
import { job, capabilities } from '#cds-models/InvoiceFlowService';

@ServiceLogic()
export default class JobService {
  @Inject(NorthWindApis) private readonly northWindApis: NorthWindApis;
  @Inject(DocInfoExtractionApis) private readonly docInfoExtractionApis: DocInfoExtractionApis;

  public async getProducts(): ActionReturn<typeof job> {
    return await this.northWindApis.getProducts();
  }
  public async getCapabilities(): ActionReturn<typeof capabilities> {
    return await this.docInfoExtractionApis.capabilities();
  }
}