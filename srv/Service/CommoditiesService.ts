import {
  ServiceLogic,
} from '@dxfrontier/cds-ts-dispatcher';

@ServiceLogic()
export default class CommoditiesService {
  public async showConsoleLog() {
    console.log('****************** After read event Commodities');
  }
}
