/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EntityHandler,
  Inject,
  OnRead,
  Request,
} from '@dxfrontier/cds-ts-dispatcher';

import {Products } from '#cds-models/DemoService';
import ProductsService from '../../../Service/ProductsService';

@EntityHandler(Products)
export default class ProductsHandler {
  @Inject(ProductsService) private readonly productsService: ProductsService;

  @OnRead()
  public async onRead(req: Request<Products>) {
   return this.productsService.getProducts(req);
  }
}
