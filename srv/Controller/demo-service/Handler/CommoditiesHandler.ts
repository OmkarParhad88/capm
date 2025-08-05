/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AfterRead,
  EntityHandler,
  Inject,
  OnRead,
} from '@dxfrontier/cds-ts-dispatcher';

import { Commodities } from '#cds-models/DemoService';
import CommoditiesService from '../../../Service/CommoditiesService';

@EntityHandler(Commodities)
export default class CommoditiesHandler {
  @Inject(CommoditiesService) private readonly commoditiesService: CommoditiesService;

  @AfterRead()
  private async afterRead() {
    this.commoditiesService.showConsoleLog();
  }
}
