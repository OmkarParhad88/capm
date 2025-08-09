/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EntityHandler,
  Req,
  Inject,
  OnRead,
  Request,
} from '@dxfrontier/cds-ts-dispatcher';

import { Books } from '#cds-models/DemoService';

import BooksService from '../../../Logic/BooksService';

@EntityHandler(Books)
export default class BooksHandler {
  @Inject(BooksService)
  private readonly booksService: BooksService;  

  @OnRead()
  public async onRead( @Req() req: Request<Books>) {
   return this.booksService.getBooks(req);
  }
}
