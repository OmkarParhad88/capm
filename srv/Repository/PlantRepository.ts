import { Plant } from '#cds-models/DemoService';
import { Repository } from '@dxfrontier/cds-ts-dispatcher';
import { BaseRepository } from '@dxfrontier/cds-ts-repository';

@Repository()
export default class PlantRepository extends BaseRepository<Plant> {
  constructor() {
    super(Plant);
  }
}

