import { Commodity } from '#cds-models/DemoService';
import { Repository } from '@dxfrontier/cds-ts-dispatcher';
import { BaseRepository } from '@dxfrontier/cds-ts-repository';

@Repository()
export default class CommodityRepository extends BaseRepository<Commodity> {
  constructor() {
    super(Commodity); 
  }
}