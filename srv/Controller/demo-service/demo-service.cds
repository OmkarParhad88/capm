using test2 as db from '../../../db/schema';

service DemoService {
  entity Commodities  as projection on db.Commodity;
  entity BusinessUnit as projection on db.BusinessUnit;
  entity Plants       as projection on db.Plant;
  entity Employees    as projection on db.Employee;
}
