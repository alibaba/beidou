import { Application } from 'beidou-core';

export default (app: Application) => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);
};