import { CDSDispatcher } from '@dxfrontier/cds-ts-dispatcher';
import UnBoundActionsHandler from './Handlers/UnBoundActionsHandler';

module.exports = new CDSDispatcher([
  UnBoundActionsHandler
]).initialize();
