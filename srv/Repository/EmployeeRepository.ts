import { Employee } from '#cds-models/DemoService';
import { Repository } from '@dxfrontier/cds-ts-dispatcher';
import { BaseRepository } from '@dxfrontier/cds-ts-repository';

@Repository()
export default class EmployeeRepository extends BaseRepository<Employee> {
  constructor() {
    super(Employee);
  }
}