import {
  Request,
  ServiceLogic,
  Service,
} from '@dxfrontier/cds-ts-dispatcher';
import cds from '@sap/cds';
import type { Books  } from '#cds-models/DemoService';
import AdminService  from '#cds-models/AdminService';

@ServiceLogic()
export default class BooksService {
  private AdminService: Service<AdminService>;
  constructor() {
    this.readAdminService();
  }
  private async readAdminService () {
    this.AdminService = await cds.connect.to('AdminService');
  }

  public async getBooks(req: Request<Books>): Promise<Books[]> {
    let data = await this.AdminService.run(req.query);
    console.log('****************** On read event Books ', data);
    return data;

    // return  await service.tx(req).run(req.query);
  }
}
