/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  OnFunction,
  OnError,
  Error,
  Req,
  UnboundActions,
  CatchAndSetErrorMessage,
  CatchAndSetErrorCode
} from '@dxfrontier/cds-ts-dispatcher';


import type {
  ActionReturn,
} from '@dxfrontier/cds-ts-dispatcher';
import { job, capabilities } from '#cds-models/InvoiceFlowService';

import UnBoundedService from '../../../Logic/UnBoundedService';

@UnboundActions()
export default class UnBoundActionsHandler {
  @Inject(UnBoundedService)
  private unBoundedService: UnBoundedService;

  @OnFunction('job')
  // @CatchAndSetErrorCode('BAD_REQUEST-400')
  private async job(): ActionReturn<typeof job> {
    return await this.unBoundedService.doJob();
  }

  @OnFunction('capabilities')
  // @CatchAndSetErrorCode('BAD_REQUEST-400')
  private async capabilities(@Req() req: Request): ActionReturn<typeof capabilities> {
    let res = await this.unBoundedService.getCapabilities(req);
    return res
  }

  @OnError()
  private onError(@Error() err: Error, @Req() req: Request) { // sync func
    if (!err.name) {
      console.log(err.name);
    }
  }

}