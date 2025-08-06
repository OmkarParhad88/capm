import { CDSDispatcher } from '@dxfrontier/cds-ts-dispatcher';
import CommoditiesHandler from './Handler/CommoditiesHandler';
import UnBoundActionsHandler from './Handler/UnBoundActionsHandler';
import ProductsHandler from './Handler/ProductsHandler';
import BooksHandler from './Handler/BooksHandler';

module.exports = new CDSDispatcher([
  CommoditiesHandler,
  BooksHandler,
  ProductsHandler,
  UnBoundActionsHandler
]).initialize();
