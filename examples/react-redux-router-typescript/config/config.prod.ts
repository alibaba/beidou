import * as path from 'path'

module.exports = appInfo => {
   return {
       static: {
           prefix: '/public/',
           dir: path.join(appInfo.baseDir, 'app/public'),
           dynamic: false,
           preload: true,
       }
   }
};