export class Config {
  static get clicksendApiUrl(): string {
    return process.env.CLICKSEND_URL || '';
  }

  static get clicksendAuth(): string {
    return process.env.CLICKSEND_AUTH || '';
  }

  static get mailerApiKey(): string {
    return process.env.MAILERSEND_API_KEY || '';
  }

  static get mailerEmailDomain(): string {
    return process.env.MAILERSEND_SENDER_DOMAIN || '';
  }
}
