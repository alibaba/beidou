
module.exports = (app) => {
  class ContactService extends app.Service {
    * list() {
      this.logger.info('Fetch data');
      return yield Promise.resolve([
        'Jim',
        'Peng',
        'Gray',
      ]);
    }
  }
  return ContactService;
};
