import nodemailer from 'nodemailer';
import { ADMIN_MAIL, GMAIL_SECRET, NODEMAILER_HOST, NODEMAILER_PORT } from '../constants/venv';

class Gmail {
  private owner;
  private transporter;

  //gmail
  constructor() {
    this.owner = {
      name: 'Gonzalo Moreno',
      address: ADMIN_MAIL,
    };

    this.transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: NODEMAILER_PORT,
      secure: true,
      auth: {
        user: ADMIN_MAIL,
        pass: GMAIL_SECRET,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(dest, subject, content) {
    console.log(dest);
    console.log(subject);
    const mailOptions = {
      from: this.owner,
      to: dest,
      subject,
      html: content,
    };

    const response = await this.transporter.sendMail(mailOptions);
    return response;
  }
}

export const GmailService = new Gmail();
