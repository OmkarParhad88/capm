import {
  Request,
  ServiceLogic,
  Service
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';
import NorthWind from '#cds-models/NorthWind';

import type { Products } from '#cds-models/DemoService';
@ServiceLogic()
export default class ProductsService {
  private northwind: Service<NorthWind>;

  constructor() {
    this.readNorthwind();
  }

  private async readNorthwind() {
    this.northwind = await cds.connect.to('NorthWind');
  }

  public async getProducts(req: Request<Products>): Promise<Products[]> {
    let data = await this.northwind.run(req.query);
    console.log('****************** On read event Products', data);
    return data;
  }
}
