import { Service } from 'beidou-core';

export default class ContactService extends Service {
  async getFrom() {
    this.logger.info('Fetch data');
    return Promise.resolve('server');
  }
}

