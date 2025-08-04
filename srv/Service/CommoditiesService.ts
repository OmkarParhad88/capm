import {
  Request,
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';

import type { Commodities } from '#cds-models/DemoService';
@ServiceLogic()
export default class CommoditiesService {
  public async showConsoleLog() {
    const Admin = await cds.connect.to('Admin');
    let result = await Admin.send({
      method: 'GET',
      path: '/books',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('****************** After read event');
    console.log(result);
  }

  public validateData(result: Commodities, req: Request) {

  }
}
