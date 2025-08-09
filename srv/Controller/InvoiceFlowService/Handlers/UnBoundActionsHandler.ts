/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  OnFunction,
  Req,
  UnboundActions,
} from '@dxfrontier/cds-ts-dispatcher';


import type {
  ActionReturn,
  ActionRequest
} from '@dxfrontier/cds-ts-dispatcher';
import { job, capabilities} from '#cds-models/InvoiceFlowService';

import JobService from '../../../Logic/UnBoundedService';

@UnboundActions()
export default class UnBoundActionsHandler {
  @Inject(JobService)
  private readonly jobService: JobService;

  @OnFunction('job')
  public async job() : ActionReturn<typeof job> {
    return await this.jobService.getProducts();
  }
  @OnFunction('capabilities')
  public async capabilities() : ActionReturn<typeof capabilities> {
    return await this.jobService.getCapabilities();
  }
}