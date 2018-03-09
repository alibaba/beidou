module.exports = (app) => {
  class ContactService extends app.Service {
    async list() {
      this.logger.info('Fetch data');
      return Promise.resolve(['Jim', 'Peng', 'Gray']);
    }
  }
  return ContactService;
};
