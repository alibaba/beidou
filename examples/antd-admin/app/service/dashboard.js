module.exports = ({ Service }) => {
  class DashboardService extends Service {
    constructor(ctx) {
      super(ctx);
      this.dashboard = this.ctx.db.dashboard;
    }

    async find() {
      const data = this.dashboard.findOne();
      return data;
    }
  }

  return DashboardService;
};
