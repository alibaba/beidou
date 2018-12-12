import { Application } from 'beidou-core';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/*', controller.home.index);
};
