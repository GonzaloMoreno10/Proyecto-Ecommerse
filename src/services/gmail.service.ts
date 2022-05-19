import nodemailer from 'nodemailer';

class Gmail {
  private owner;
  private transporter;

  constructor() {
    this.owner = {
      name: 'Gonzalo Moreno',
      address: 'gonzamoreno21@gmail.com',
    };

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'gonzamoreno21@gmail.com',
        pass: 'lqdpzavkdjqnihkq',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(dest, subject, content) {
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
