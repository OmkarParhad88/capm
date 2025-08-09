export type GmailMessage = {
  from: string;
  name: string;
  subject: string;
  date: string;
  body: string;
  attachments:attachments[];
};

export type attachments = {
  contentType: string;
  filename: string;
  filePath: string;
  size: number;
}