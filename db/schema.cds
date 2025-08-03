using { managed } from '@sap/cds/common';

namespace test2;

entity Commodity : managed {
  key commodityCode : String(5);
  description        : String(100);
  project            : String(10);
  carline            : String(10);
  manager            : Association to Employee ;
  businessUnit       : Association to BusinessUnit @mandatory;
  quantity           : Integer ;
  plant              : Association to Plant @mandatory;
}

entity BusinessUnit {
  key ID          : Integer;
  description     : String(10);
  employees: Association to many Employee
                      on employees.businessUnit = $self;
}

entity Plant {
  key ID          : Integer;
  name            : String(100);
  employees: Association to many Employee
                      on employees.plant = $self;
  currency        : String(20);
}

entity Employee : managed {
  key ID           : String(12);
  firstName        : String(20);
  lastName         : String(20);
  designation      : String(40);
  address          : String(100);
  email            : String(20);
  phone            : Integer;
  businessUnit     : Association to BusinessUnit;
  plant            : Association to Plant;
}
