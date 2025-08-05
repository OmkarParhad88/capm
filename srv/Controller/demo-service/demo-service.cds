using test2 as db from '../../../db/schema';
using {NorthWind as external} from './../../external/NorthWind.csn';

service DemoService {
  entity Commodities  as projection on db.Commodity;
  entity BusinessUnit as projection on db.BusinessUnit;
  entity Plants       as projection on db.Plant;
  entity Employees    as projection on db.Employee;

  @readonly
  @cds.persistence.skip
  entity Products     as projection on external.Products;

  function checkData() returns {};
}
