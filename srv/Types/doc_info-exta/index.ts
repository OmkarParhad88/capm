export type DocJobResponse = {
  // status:  "pending" | "completed" | "failed";
  status: string;
  id: string;
  processedTime: string;
}

export type withEmaiData = {
  from: string;
  name: string;
  subject: string;
  date: string;
  body: string;
  docJobResponses: DocJobResponse[]|DocInfoExtractionRequest[];
}

// export type withEmaiDataAndJobDone = {
//   from: string;
//   name: string;
//   subject: string;
//   date: string;
//   body: string;
//   docJobResponses: DocJobResponse[];
// }

export type DocInfoExtractionRequest = {
  status: string;
  id: string;
  fileName: string;
  documentType: string;
  languageCodes: string[];
  pageCount: number;
  country: string;
  extraction?: Extraction;
  messages?: { code: string; level: string; text: string }[];
};

export type Extraction = {
  headerFields: ExtractedField[];
  lineItems: ExtractedField[][];
};

export type ExtractedField = {
  name: string;
  category: string;
  value: string;
  rawValue: string;
  type: string | number;
  page: number;
  confidence: number;
  coordinates: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  model: number;
  label: number;
};
