import { Application } from 'beidou';

export default (app: Application) => {
  const { router, controller } = app;
  router.resources('users', '/api/users', controller.api.user);

  router.get('/', controller.main.list);
  router.get('/user/:id', controller.main.show);
  router.get('/create', controller.main.create);
};
