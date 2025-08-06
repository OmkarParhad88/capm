using test2 as db from '../../../db/schema';
using {NorthWind as northwind} from './../../external/NorthWind/NorthWind.csn';
using {AdminService as admin} from './../../external/AdminService/AdminService.csn';

service DemoService {
  entity Commodities  as projection on db.Commodity;
  entity BusinessUnit as projection on db.BusinessUnit;
  entity Plants       as projection on db.Plant;
  entity Employees    as projection on db.Employee;

  @readonly
  @cds.persistence.skip
  entity Products     as projection on northwind.Products;

  @cds.persistence.skip
  entity Books        as projection on admin.books;


  function checkData() returns {};
}
