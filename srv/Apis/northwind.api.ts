import {
  Request,
  Service,
  ActionReturn
} from '@dxfrontier/cds-ts-dispatcher';

import cds from '@sap/cds';
import NorthWind, { Product } from '#cds-models/NorthWind';
import { job } from '#cds-models/InvoiceFlowService';

export default class NorthWindApis {
  private northwind: Service<NorthWind>;

  constructor() {
    this.connectNorthwind();
  }

  public async connectNorthwind(): Promise<Service<NorthWind>> {
    return this.northwind = await cds.connect.to('NorthWind');
  }

  public async getProducts(): ActionReturn<typeof job> {
    return await this.northwind.send('GET', '/Products');
  }

  public async Products(req: Request): Promise<Product[]> {
    return await this.northwind.run(req.query);
  }
}
