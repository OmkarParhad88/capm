import * as fs from 'fs';
import * as path from 'path';
import { InvoiceOutput, LineItems } from '../Types/build-process';
import { DocInfoExtractionRequest, ExtractedField } from '../Types/doc_info-exta';

export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}

export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, 'base64');
}

export function bufferToFilePath(buffer: Buffer, fileName: string): string {
  const filePath = path.join(__dirname, fileName || 'attachment');
  fs.writeFileSync(filePath, buffer);
  return filePath;
}

export function filePathToBuffer(filePath: string): Buffer {
  return fs.readFileSync(filePath);
}

export function extractInvoiceData(data: DocInfoExtractionRequest): InvoiceOutput {
  const getField = (name: string) => {
    return data.extraction?.headerFields.find((field: any) => field.name === name)?.value || null;
  };

  const parseNumber = (val: any) => (typeof val === 'number' ? val : parseFloat(val?.toString().replace(/[₹,]/g, '') || '0'));

  const lineitems: LineItems[] = (data.extraction?.lineItems || []).map((itemArr: any[]) => {
    const get = (key: string) => itemArr.find(item => item.name === key)?.value;
    return {
      description: get("description") || "",
      quantity: String(get("quantity")) || "",
      unitPrice: String(get("unitPrice")) || "",
      netAmount: String(get("netAmount")) || "",
      unitOfMeasure: get("unitOfMeasure") || "",
    };
  });

  const invoicedetails = {
    invoiceNumber: getField("documentNumber") || "",
    invoiceDate: getField("documentDate") || "",
    dueDate: getField("dueDate") || "",
    poNumber: getField("purchaseOrderNumber") || "",
    poDate: "", // not found in provided JSON
    grossAmount: String(getField("grossAmount")) || "",
    currency: getField("currencyCode") || "",
    CGST: getField("taxName") === "CGSTO" ? String((getField("taxAmount")) || "") : "",
    SGST: getField("taxName") === "SGSTO" ? String((getField("taxAmount") )|| "") : "",
    IGST: "", // Not available in your sample
    subtotal: String(getField("netAmount")) || "",
  };

  const supplier = {
    name: getField("senderName") || "",
    address: getField("senderAddress") || "",
  };

  const billto = {
    name: getField("receiverName") || "",
    address: getField("receiverAddress") || "",
  };

  const shipto = billto; // If you have a separate shipTo field later, update here.

  return {
    invoicedetails,
    supplier,
    billto,
    shipto,
    lineitems,
  };
}

// export function buildWorkflowPayload(data: DocInfoExtractionRequest): docExtractionResponse {
//   return {



// fileName: data.fileName,
// documentType: data.documentType,
// invoiceNumber: "123456",
// invoiceGrossAmount: String(data.extraction?.headerFields.find((field) => field.name === "grossAmount")?.value) || "",
// invoiceDate: new Date(data.extraction?.headerFields.find((field) => field.name === "documentDate")?.value || new Date()),
// paymentTerms: data.extraction?.headerFields.find((field) => field.name === "paymentTerms")?.value || "",
// senderName: data.extraction?.headerFields.find((field) => field.name === "senderName")?.value || "",
// receiverName: data.extraction?.headerFields.find((field) => field.name === "receiverName")?.value || "",
// senderAddress: data.extraction?.headerFields.find((field) => field.name === "senderAddress")?.value || "",
// receiverAddress: data.extraction?.headerFields.find((field) => field.name === "receiverAddress")?.value || "",
// lineItems: mapLineItems(data.extraction?.lineItems || [])
//   }
// }

// export function mapLineItems(data: ExtractedField[][]): LineItems[] {
//   return data.map(itemGroup => {
//     const item: LineItems = {} as LineItems;
//     itemGroup.forEach(field => {
//       if (["description", "quantity", "unitPrice", "netAmount"].includes(field.name)) {
//         item[field.name] = field.value;
//       }
//     });
//     return item;
//   });
// }