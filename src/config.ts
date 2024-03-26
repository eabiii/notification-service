export class Config {
  static get clicksendApiUrl(): string {
    return process.env.CLICKSEND_URL || '';
  }

  static get clicksendAuth(): string {
    return process.env.CLICKSEND_AUTH || '';
  }
}
