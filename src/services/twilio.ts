import twilio from 'twilio';
import { TWILIO_SID, TWILIO_TOKEN, ADMIN_CELPHONE, TWILIO_ADMIN_WHATSAPP } from '../constantes/venv';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

class Twilio {
  twilio;

  constructor() {
    this.twilio = twilio(TWILIO_SID, TWILIO_TOKEN);
  }

  async sendMessage(cellphoneNumber: string, message: string) {
    const params = {
      body: message,
      from: ADMIN_CELPHONE,
      to: cellphoneNumber,
    };

    const response = await this.twilio.messages.create(params);
    return response;
  }

  async sendWhatSapp(cellphoneNumber: string, message: string, picture?: string) {
    const params: MessageListInstanceCreateOptions = {
      body: message,
      from: `whatsapp:${TWILIO_ADMIN_WHATSAPP}`,
      to: `whatsapp:${cellphoneNumber}`,
    };

    if (picture) params.mediaUrl = [picture];

    const response = await this.twilio.messages.create(params);
    return response;
  }
}

export const SmsService = new Twilio();
