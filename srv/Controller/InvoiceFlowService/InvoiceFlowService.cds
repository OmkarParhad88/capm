service InvoiceFlowService {
  function job() returns array of  Product;
  function capabilities() returns LargeString;
}

type Product : {
  ID                : Integer;
  Name              : String;
  Description       : String;
  ReleaseDate       : DateTime;
  DiscontinuedDate  : DateTime;
  Rating            : Integer;
  Price             : Decimal(10,2);
};