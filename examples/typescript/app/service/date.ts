import { Service } from 'beidou';

export default class DateService extends Service {
  public async now(): Promise<number> {
    return Date.now();
  }
}
