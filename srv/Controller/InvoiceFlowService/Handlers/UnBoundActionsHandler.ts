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
  ActionRequest,
} from '@dxfrontier/cds-ts-dispatcher';
import { job, capabilities } from '#cds-models/InvoiceFlowService';

import UnBoundedService from '../../../Logic/UnBoundedService';

@UnboundActions()
export default class UnBoundActionsHandler {
  @Inject(UnBoundedService)
  private readonly unBoundedService: UnBoundedService;

  @OnFunction('job')
  private async job(): ActionReturn<typeof job> {
    return await this.unBoundedService.doJob();
  }
  @OnFunction('capabilities')
  // @CatchAndSetErrorCode('BAD_REQUEST-400')
  // @CatchAndSetErrorMessage('User data could not be retrieved', 'NOT_FOUND-404') 
  private async capabilities(): ActionReturn<typeof capabilities> {
    return await this.unBoundedService.getCapabilities();
  }

  @OnError()
  private onError(@Error() err: Error, @Req() req: Request) { // sync func
    if (!err.name) {
      console.log(err.name);
    }
  }


}