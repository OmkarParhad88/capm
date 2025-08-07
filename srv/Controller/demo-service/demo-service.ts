import { CDSDispatcher } from '@dxfrontier/cds-ts-dispatcher';
import CommoditiesHandler from './Handlers/CommoditiesHandler';
import UnBoundActionsHandler from './Handlers/UnBoundActionsHandler';
import ProductsHandler from './Handlers/ProductsHandler';
import BooksHandler from './Handlers/BooksHandler';

module.exports = new CDSDispatcher([
  CommoditiesHandler,
  BooksHandler,
  ProductsHandler,
  UnBoundActionsHandler
]).initialize();
