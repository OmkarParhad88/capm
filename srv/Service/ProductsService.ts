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
    return northwind.run(req.query)
    
    // return  await service.tx(req).run(req.query);
  }
}
