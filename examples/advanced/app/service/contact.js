module.exports = (app) => {
  class ContactService extends app.Service {
    async list() {
      this.logger.info('Fetch data');
      return await Promise.resolve(['Jim', 'Peng', 'Gray']);
    }
  }
  return ContactService;
};
