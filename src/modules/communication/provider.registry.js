// VEDIC TREE OS — Multi-Channel Provider Registry (Module 05)
// Ensures zero vendor hardcoding across WhatsApp, SMS, Email, Push, and In-App
import { MockWhatsAppProvider } from './providers/mock.provider.js';
import { MetaCloudWhatsAppProvider } from './providers/meta-cloud.provider.js';
import { TwilioWhatsAppProvider } from './providers/twilio.provider.js';
import { MockSmsProvider, Msg91SmsProvider, TwilioSmsProvider } from './providers/sms.provider.js';
import { MockEmailProvider, SendGridEmailProvider, AwsSesEmailProvider } from './providers/email.provider.js';
import { MockPushProvider, FcmPushProvider } from './providers/push.provider.js';
import { InAppNotificationProvider } from './providers/inapp.provider.js';

export class ProviderRegistry {
  constructor() {
    // Map of channel -> Map of providerId -> provider instance
    this.channelProviders = new Map([
      ['WHATSAPP', new Map()],
      ['SMS', new Map()],
      ['EMAIL', new Map()],
      ['PUSH', new Map()],
      ['IN_APP', new Map()]
    ]);

    // Active provider key per channel
    this.activeProviders = {
      WHATSAPP: 'MOCK',
      SMS: 'MSG91',
      EMAIL: 'SENDGRID',
      PUSH: 'FCM',
      IN_APP: 'IN_APP'
    };

    this.registerDefaults();
  }

  registerDefaults() {
    // WhatsApp
    this.register('WHATSAPP', 'MOCK', new MockWhatsAppProvider());
    this.register('WHATSAPP', 'META_CLOUD', new MetaCloudWhatsAppProvider());
    this.register('WHATSAPP', 'TWILIO', new TwilioWhatsAppProvider());

    // SMS
    this.register('SMS', 'MOCK_SMS', new MockSmsProvider());
    this.register('SMS', 'MSG91', new Msg91SmsProvider());
    this.register('SMS', 'TWILIO_SMS', new TwilioSmsProvider());

    // Email
    this.register('EMAIL', 'MOCK_EMAIL', new MockEmailProvider());
    this.register('EMAIL', 'SENDGRID', new SendGridEmailProvider());
    this.register('EMAIL', 'AWS_SES', new AwsSesEmailProvider());

    // Push
    this.register('PUSH', 'MOCK_PUSH', new MockPushProvider());
    this.register('PUSH', 'FCM', new FcmPushProvider());

    // In-App
    this.register('IN_APP', 'IN_APP', new InAppNotificationProvider());
  }

  register(channel, providerId, providerInstance) {
    const ch = channel.toUpperCase();
    if (!this.channelProviders.has(ch)) {
      this.channelProviders.set(ch, new Map());
    }
    this.channelProviders.get(ch).set(providerId.toUpperCase(), providerInstance);
  }

  setActiveProvider(channel, providerId) {
    const ch = channel.toUpperCase();
    const pid = providerId.toUpperCase();
    const providers = this.channelProviders.get(ch);
    if (!providers || !providers.has(pid)) {
      throw new Error(`Provider '${providerId}' is not registered for channel '${channel}'.`);
    }
    this.activeProviders[ch] = pid;
  }

  getActiveProvider(channel) {
    const ch = channel.toUpperCase();
    const activeKey = this.activeProviders[ch];
    const providers = this.channelProviders.get(ch);
    if (!providers || !providers.has(activeKey)) {
      throw new Error(`No active provider configured for channel '${channel}'.`);
    }
    return providers.get(activeKey);
  }

  getProvider(channel, providerId) {
    const ch = channel.toUpperCase();
    const pid = providerId.toUpperCase();
    const providers = this.channelProviders.get(ch);
    return providers ? providers.get(pid) : null;
  }

  listProviders() {
    const list = {};
    for (const [ch, map] of this.channelProviders.entries()) {
      list[ch] = {
        active: this.activeProviders[ch],
        available: Array.from(map.keys())
      };
    }
    return list;
  }
}

export const defaultProviderRegistry = new ProviderRegistry();
