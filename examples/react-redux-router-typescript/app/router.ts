import { Application } from 'beidou';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/*', controller.home.index);
};
