import { Service } from 'beidou-core';

export default class DateService extends Service {
  public async now(): Promise<number> {
    return Date.now();
  }
}
