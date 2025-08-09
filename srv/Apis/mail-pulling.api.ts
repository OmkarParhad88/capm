import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { attachments, GmailMessage } from '../Types/Gamil';
import { bufferToFilePath } from '../Utils';

export class GmailApis {


  public async fetchLatestEmailAttachments(): Promise<GmailMessage[]> {
    const result: GmailMessage[] = []
    const client = new ImapFlow({
      host: 'imap.gmail.com',
      port: 993,
      secure: true,
      auth: {
        user: 'omkarparhad88pro@gmail.com',
        pass: 'gnff swzc vwff nujz' // App password
      }
    });

    await client.connect();

    let lock = await client.getMailboxLock("INBOX");
    try {
      for await (let message of client.fetch(
        { seen: false },
        {
          envelope: true,
          internalDate: true,
          bodyStructure: true,
          flags: true,
          source: true,
        }
      )) {
        let parsed = await simpleParser(message.source);
        console.log("Message UID: " + message.uid);
        console.log("Date: " + parsed.date);
        console.log("Subject: " + parsed.subject);

        if (!parsed.attachments.length) {
          console.log('No attachments found');
          continue;
        }
        const attachments = parsed.attachments;

        const mapAttachments = attachments.map((attachment: any): attachments => (
          {
            filename: attachment.filename,
            filePath: bufferToFilePath(attachment.content, attachment.filename),
            contentType: attachment.contentType,
            size: attachment.size,
          }))

        result.push({
          from: parsed.from.value[0].address,
          name: parsed.from.value[0].name,
          subject: parsed.subject,
          date: parsed.date,
          body: parsed.text,
          attachments: mapAttachments,
        })
      }

      await client.messageFlagsAdd({ seen: false }, ["\\Seen"]);
    } finally {

      lock.release();
    }
    await client.logout();
    return result;
  };
}
