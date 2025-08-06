import {
  Request,
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';
// import  cdse from 'cdse';

import type { Products } from '#cds-models/DemoService';
@ServiceLogic()
export default class ProductsService {
  private northwind: any ;
  constructor() {
    this.readNorthwind();
  }
  private async readNorthwind() {
    this.northwind = await cds.connect.to('NorthWind');
    
  }

  public async getProducts(req: Request<Products>) {
    console.log('****************** On read event Products');
    // const northwind = await cdse.connect.to('NorthWind');
    let data = await this.northwind.run(req.query);
    console.log('****************** On read event Products', data);
    return data;

    // return  await service.tx(req).run(req.query);
  }
}
