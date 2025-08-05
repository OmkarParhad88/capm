import { CDSDispatcher } from '@dxfrontier/cds-ts-dispatcher';
import CommoditiesHandler from './Handler/CommoditiesHandler';
import UnBoundActionsHandler from './Handler/UnBoundActionsHandler';
import ProductsHandler from './Handler/ProductsHandler';

module.exports = new CDSDispatcher([
  CommoditiesHandler,
  ProductsHandler,
  UnBoundActionsHandler
]).initialize();
