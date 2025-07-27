import {
  Request,
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';

import type { Commodities } from '#cds-models/DemoService';
@ServiceLogic()
export default class CommoditiesService {
  public showConsoleLog() {
    console.log('****************** Before read event');
  }

  public validateData(result: Commodities, req: Request) {
    
  }
}
