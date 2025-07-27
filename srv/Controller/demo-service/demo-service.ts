import { CDSDispatcher } from '@dxfrontier/cds-ts-dispatcher';
import CommoditiesHandler from './Handler/CommoditiesHandler';

module.exports = new CDSDispatcher([
  CommoditiesHandler
]).initialize();