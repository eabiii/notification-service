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

  static get mongodbUrl(): string {
    return process.env.MONGO_URL || '';
  }

  static get mongodbName(): string {
    return process.env.MONGO_DB_NAME || '';
  }
}
