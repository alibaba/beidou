'use strict';

module.exports = (app) => {
    const { router, controller } = app;
    router.post('/proxy', controller.foo);
};
