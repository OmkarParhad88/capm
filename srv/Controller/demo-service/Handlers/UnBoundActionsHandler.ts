/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UnboundActions,
  OnFunction
} from '@dxfrontier/cds-ts-dispatcher';

import {
  checkData
} from '#cds-models/DemoService';

import type {
  ActionReturn,
  ActionRequest,
  NextEvent,

} from '@dxfrontier/cds-ts-dispatcher';

@UnboundActions()
 export default class UnBoundActionsHandler {
  // @Inject(CDS_DISPATCHER.SRV) private readonly srv: Service;

  @OnFunction('checkData')
  public async checkData(
  ): ActionReturn<typeof checkData> {
    return "omkar";
  }

}