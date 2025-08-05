import {
  Request,
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';

import type { Products } from '#cds-models/DemoService';
@ServiceLogic()
export default class CommoditiesService {

  public async getProducts(req: Request<Products>) {
    console.log('****************** On read event Products');
    const northwind = await cds.connect.to('NorthWind');
    let data = await northwind.run(req.query);

    let data1 = await 

    console.log('****************** On read event Products', data);
    return data;

    // return  await service.tx(req).run(req.query);
  }
}
