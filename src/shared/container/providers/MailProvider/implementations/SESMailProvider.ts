import { SES } from 'aws-sdk';
import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  public constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  public async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path, { encoding: 'utf-8' });

    const templateParse = Handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: `Rentx <${process.env.AWS_SES_MAIL}>`,
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
