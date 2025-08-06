/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  EntityHandler,
  Inject,
  OnRead,
  Request,
} from '@dxfrontier/cds-ts-dispatcher';

import { Books } from '#cds-models/DemoService';

import BooksService from '../../../Service/BooksService';

@EntityHandler(Books)
export default class BooksHandler {
  @Inject(BooksService) private readonly booksService: BooksService;  

  @OnRead()
  public async onRead(req: Request<Books>) {
   return this.booksService.getBooks(req);
  }
}
