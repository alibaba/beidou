import * as path from 'path';

export default appInfo => {
  return {
    static: {
      prefix: '/public/',
      dir: path.join(appInfo.baseDir, 'app/public'),
      dynamic: false,
      preload: true,
    },
  };
};
