// src/Types/build-process/build-process.types.ts
export type InvoiceOutput = {
  invoicedetails: {
    invoiceNumber: string;
    currency: string;
    CGST: string;
    SGST: string;
    IGST: string;
    subtotal: string;
    invoiceDate: string;
    dueDate: string;
    poNumber: string;
    poDate: string;
    grossAmount: string;

  };
  supplier: {
    name: string;
    address: string;
  };
  billto: {
    name: string;
    address: string;
  };
  shipto: {
    name: string;
    address: string;
  };
  lineitems: LineItems[];
};

export type LineItems = {
  description: string;
  quantity: string;
  unitPrice: string;
  netAmount: string;
  unitOfMeasure: string;
};

export type WorkflowTriggerResponse = {
  id: string;
  definitionId: string;
  definitionVersion: string;
  subject: string | null;
  status: string;
  startedAt: string; // ISO date string
  startedBy: string;
  completedAt: string | null;
  businessKey: string | null;
  parentInstanceId: string | null;
  rootInstanceId: string;
  applicationScope: string;
  projectId: string;
  projectVersion: string;
};
