// VEDIC TREE OS — In-App Notification Provider Adapter (Module 05)
// Real-time in-app notification center and bell alert provider
import { ICommunicationProvider } from '../provider.interface.js';

export class InAppNotificationProvider extends ICommunicationProvider {
  constructor() {
    super('IN_APP');
  }

  getChannel() {
    return 'IN_APP';
  }

  sendTextMessage({ to, text, subject = 'Notification', metadata = {} }) {
    const messageId = `inapp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    return {
      success: true,
      messageId,
      status: 'DELIVERED', // In-app is instantly delivered to database inbox
      provider: this.name,
      renderedBody: text,
      metadata: {
        userId: to,
        title: subject,
        ...metadata
      }
    };
  }

  sendTemplateMessage({ to, templateId, rawTemplateBody, parameters = {}, metadata = {} }) {
    let rendered = rawTemplateBody;
    for (const [key, val] of Object.entries(parameters)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
    }
    const subject = metadata.subject || 'Institutional Update';
    return this.sendTextMessage({
      to,
      text: rendered,
      subject,
      metadata: { ...metadata, templateId }
    });
  }
}
