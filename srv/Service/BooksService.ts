import {
  Request,
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';
// import  cdse from 'cdse';

import type { Books } from '#cds-models/DemoService';
@ServiceLogic()
export default class BooksService {
  private AdminService: any ;
  constructor() {
    this.readAdminService();
  }
  private async readAdminService () {
    this.AdminService = await cds.connect.to('AdminService');
    
  }

  public async getBooks(req: Request<Books>) {
    console.log('****************** On read event Books');
    // const northwind = await cdse.connect.to('NorthWind');
    let data = await this.AdminService.run(req.query);
    console.log('****************** On read event Books ', data);
    return data;

    // return  await service.tx(req).run(req.query);
  }
}
