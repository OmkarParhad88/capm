/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CDS_DISPATCHER,
  Error,
  FieldsFormatter,
  GetRequest,
  Inject,
  Msg,
  Next,
  OnAction,
  OnError,
  OnEvent,
  OnFunction,
  OnSubscribe,
  Prepend,
  Req,
  Res,
  Service,
  UnboundActions,
  Use,
  Validate,
} from '@dxfrontier/cds-ts-dispatcher';

import {
  checkData
} from '#cds-models/DemoService';

import type {
  ExposeFields,
  ActionReturn,
  ActionRequest,
  NextEvent,
  Request,
  RequestResponse,
  SubscriberType,
} from '@dxfrontier/cds-ts-dispatcher';

@UnboundActions()
class UnBoundActionsHandler {
  // @Inject(CDS_DISPATCHER.SRV) private readonly srv: Service;

  @OnFunction('checkData')
  public async checkData(
    @Req() req: ActionRequest<typeof checkData>,
    @Next() next: NextEvent,
  ): ActionReturn<typeof checkData> {
    return {
      
    };
  }

}

export default UnBoundActionsHandler;