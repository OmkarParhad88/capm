import { BusinessUnit } from '#cds-models/DemoService';
import { Repository } from '@dxfrontier/cds-ts-dispatcher';
import { BaseRepository } from '@dxfrontier/cds-ts-repository';

@Repository()
export default class BusinessUnitRepository extends BaseRepository<BusinessUnit> {
  constructor() {
    super(BusinessUnit);
  }
}