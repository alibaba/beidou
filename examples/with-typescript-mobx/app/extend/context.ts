import { Context } from 'beidou';

const context = {} as Context;

context.success = function(data) {
  this.body = {
    success: true,
    data,
  };
};

export default context;
