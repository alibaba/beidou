/** ****/ (function (modules) {
  // webpackBootstrap
  /** ****/ const parentHotUpdateCallback = this.webpackHotUpdate;
  /** ****/ this.webpackHotUpdate = /** ****/ function webpackHotUpdateCallback(
    chunkId,
    moreModules
  ) {
    // eslint-disable-line no-unused-vars
    /** ****/ hotAddUpdateChunk(chunkId, moreModules);
    /** ****/ if (parentHotUpdateCallback) {
      parentHotUpdateCallback(chunkId, moreModules);
    }
    /** ****/
  };
  /** ****/

  /** ****/ function hotDownloadUpdateChunk(chunkId) {
    // eslint-disable-line no-unused-vars
    /** ****/ const head = document.getElementsByTagName('head')[0];
    /** ****/ const script = document.createElement('script');
    /** ****/ script.type = 'text/javascript';
    /** ****/ script.charset = 'utf-8';
    /** ****/ script.src = `${
      __webpack_require__.p
    }${chunkId}.${hotCurrentHash}.hot-update.js`;
    /** ****/ head.appendChild(script);
    /** ****/
  }
  /** ****/

  /** ****/ function hotDownloadManifest(callback) {
    // eslint-disable-line no-unused-vars
    /** ****/ if (typeof XMLHttpRequest === 'undefined') {
      /** ****/ return callback(new Error('No browser support'));
    }
    /** ****/ try {
      /** ****/ var request = new XMLHttpRequest();
      /** ****/ var requestPath = `${
        __webpack_require__.p
      }${hotCurrentHash}.hot-update.json`;
      /** ****/ request.open('GET', requestPath, true);
      /** ****/ request.timeout = 10000;
      /** ****/ request.send(null);
      /** ****/
    } catch (err) {
      /** ****/ return callback(err);
      /** ****/
    }
    /** ****/ request.onreadystatechange = function () {
      /** ****/ if (request.readyState !== 4) return;
      /** ****/ if (request.status === 0) {
        /** ****/ // timeout
        /** ****/ callback(
          new Error(`Manifest request to ${requestPath} timed out.`)
        );
        /** ****/
      } else if (request.status === 404) {
        /** ****/ // no update available
        /** ****/ callback();
        /** ****/
      } else if (request.status !== 200 && request.status !== 304) {
        /** ****/ // other failure
        /** ****/ callback(
          new Error(`Manifest request to ${requestPath} failed.`)
        );
        /** ****/
      } else {
        /** ****/ // success
        /** ****/ try {
          /** ****/ var update = JSON.parse(request.responseText);
          /** ****/
        } catch (e) {
          /** ****/ callback(e);
          /** ****/ return;
          /** ****/
        }
        /** ****/ callback(null, update);
        /** ****/
      }
      /** ****/
    };
    /** ****/
  } // Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
  /** ****/
  /** ****/

  /** ****/

  /** ****/ /** ****/ let canDefineProperty = false;
  /** ****/ try {
    /** ****/ Object.defineProperty({}, 'x', {
      /** ****/ get() {},
      /** ****/
    });
    /** ****/ canDefineProperty = true;
    /** ****/
  } catch (x) {
    /** ****/
    // IE will fail on defineProperty
    /** ****/
  }
  /** ****/

  /** ****/ let hotApplyOnUpdate = true;
  /** ****/ var hotCurrentHash = 'bd20cc45043f6015f1b0'; // eslint-disable-line no-unused-vars
  /** ****/ const hotCurrentModuleData = {};
  /** ****/ let hotCurrentParents = []; // eslint-disable-line no-unused-vars
  /** ****/

  /** ****/ function hotCreateRequire(moduleId) {
    // eslint-disable-line no-unused-vars
    /** ****/ const me = installedModules[moduleId];
    /** ****/ if (!me) return __webpack_require__;
    /** ****/ const fn = function (request) {
      /** ****/ if (me.hot.active) {
        /** ****/ if (installedModules[request]) {
          /** ****/ if (
            installedModules[request].parents.indexOf(moduleId) < 0
          ) {
            /** ****/ installedModules[request].parents.push(moduleId);
          }
          /** ****/ if (me.children.indexOf(request) < 0) {
            /** ****/ me.children.push(request);
          }
          /** ****/
        } else hotCurrentParents = [moduleId];
        /** ****/
      } else {
        /** ****/ console.warn(
          `[HMR] unexpected require(${request}) from disposed module ${moduleId}`
        );
        /** ****/ hotCurrentParents = [];
        /** ****/
      }
      /** ****/ return __webpack_require__(request);
      /** ****/
    };
    /** ****/ for (const name in __webpack_require__) {
      /** ****/ if (
        Object.prototype.hasOwnProperty.call(__webpack_require__, name)
      ) {
        /** ****/ if (canDefineProperty) {
          /** ****/ Object.defineProperty(
            fn,
            name,
            (function (name) {
              /** ****/ return {
                /** ****/ configurable: true,
                /** ****/ enumerable: true,
                /** ****/ get() {
                  /** ****/ return __webpack_require__[name];
                  /** ****/
                },
                /** ****/ set(value) {
                  /** ****/ __webpack_require__[name] = value;
                  /** ****/
                },
                /** ****/
              };
              /** ****/
            }(name))
          );
          /** ****/
        } else {
          /** ****/ fn[name] = __webpack_require__[name];
          /** ****/
        }
        /** ****/
      }
      /** ****/
    }
    /** ****/

    /** ****/ function ensure(chunkId, callback) {
      /** ****/ if (hotStatus === 'ready') /** ****/ hotSetStatus('prepare');
      /** ****/ hotChunksLoading++;
      /** ****/ __webpack_require__.e(chunkId, () => {
        /** ****/ try {
          /** ****/ callback.call(null, fn);
          /** ****/
        } finally {
          /** ****/ finishChunkLoading();
          /** ****/
        }
        /** ****/

        /** ****/ function finishChunkLoading() {
          /** ****/ hotChunksLoading--;
          /** ****/ if (hotStatus === 'prepare') {
            /** ****/ if (!hotWaitingFilesMap[chunkId]) {
              /** ****/ hotEnsureUpdateChunk(chunkId);
              /** ****/
            }
            /** ****/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
              /** ****/ hotUpdateDownloaded();
              /** ****/
            }
            /** ****/
          }
          /** ****/
        }
        /** ****/
      });
      /** ****/
    }
    /** ****/ if (canDefineProperty) {
      /** ****/ Object.defineProperty(fn, 'e', {
        /** ****/ enumerable: true,
        /** ****/ value: ensure,
        /** ****/
      });
      /** ****/
    } else {
      /** ****/ fn.e = ensure;
      /** ****/
    }
    /** ****/ return fn;
    /** ****/
  }
  /** ****/

  /** ****/ function hotCreateModule(moduleId) {
    // eslint-disable-line no-unused-vars
    /** ****/ var hot = {
      /** ****/ // private stuff
      /** ****/ _acceptedDependencies: {},
      /** ****/ _declinedDependencies: {},
      /** ****/ _selfAccepted: false,
      /** ****/ _selfDeclined: false,
      /** ****/ _disposeHandlers: [], // Module API
      /** ****/

      /** ****/ /** ****/ active: true,
      /** ****/ accept(dep, callback) {
        /** ****/ if (typeof dep === 'undefined') {
          /** ****/ hot._selfAccepted = true;
        } else if (typeof dep === 'function') {
          /** ****/ /** ****/ hot._selfAccepted = dep;
        } else if (typeof dep === 'object') {
          /** ****/ /** ****/ for (let i = 0; i < dep.length; i++) /** ****/ {
            hot._acceptedDependencies[dep[i]] = callback;
          }
        } else /** ****/ /** ****/ hot._acceptedDependencies[dep] = callback;
        /** ****/
      },
      /** ****/ decline(dep) {
        /** ****/ if (typeof dep === 'undefined') {
          /** ****/ hot._selfDeclined = true;
        } else if (typeof dep === 'number') {
          /** ****/ /** ****/ hot._declinedDependencies[dep] = true;
        } else {
          /** ****/ /** ****/ for (let i = 0; i < dep.length; i++) /** ****/ {
            hot._declinedDependencies[dep[i]] = true;
          }
        }
        /** ****/
      },
      /** ****/ dispose(callback) {
        /** ****/ hot._disposeHandlers.push(callback);
        /** ****/
      },
      /** ****/ addDisposeHandler(callback) {
        /** ****/ hot._disposeHandlers.push(callback);
        /** ****/
      },
      /** ****/ removeDisposeHandler(callback) {
        /** ****/ const idx = hot._disposeHandlers.indexOf(callback);
        /** ****/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
        /** ****/
      }, // Management API
      /** ****/

      /** ****/ /** ****/ check: hotCheck,
      /** ****/ apply: hotApply,
      /** ****/ status(l) {
        /** ****/ if (!l) return hotStatus;
        /** ****/ hotStatusHandlers.push(l);
        /** ****/
      },
      /** ****/ addStatusHandler(l) {
        /** ****/ hotStatusHandlers.push(l);
        /** ****/
      },
      /** ****/ removeStatusHandler(l) {
        /** ****/ const idx = hotStatusHandlers.indexOf(l);
        /** ****/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
        /** ****/
      }, // inherit from previous dispose call
      /** ****/

      /** ****/ /** ****/ data: hotCurrentModuleData[moduleId],
      /** ****/
    };
    /** ****/ return hot;
    /** ****/
  }
  /** ****/

  /** ****/ var hotStatusHandlers = [];
  /** ****/ var hotStatus = 'idle';
  /** ****/

  /** ****/ function hotSetStatus(newStatus) {
    /** ****/ hotStatus = newStatus;
    /** ****/ for (let i = 0; i < hotStatusHandlers.length; i++) /** ****/ {
      hotStatusHandlers[i].call(null, newStatus);
    }
    /** ****/
  } // while downloading
  /** ****/

  /** ****/ /** ****/ var hotWaitingFiles = 0;
  /** ****/ var hotChunksLoading = 0;
  /** ****/ var hotWaitingFilesMap = {};
  /** ****/ let hotRequestedFilesMap = {};
  /** ****/ let hotAvailibleFilesMap = {};
  /** ****/ let hotCallback; // The update info
  /** ****/

  /** ****/ /** ****/ let hotUpdate,
    hotUpdateNewHash;
  /** ****/

  /** ****/ function toModuleId(id) {
    /** ****/ const isNumber = `${+id}` === id;
    /** ****/ return isNumber ? +id : id;
    /** ****/
  }
  /** ****/

  /** ****/ function hotCheck(apply, callback) {
    /** ****/ if (hotStatus !== 'idle') {
      throw new Error('check() is only allowed in idle status');
    }
    /** ****/ if (typeof apply === 'function') {
      /** ****/ hotApplyOnUpdate = false;
      /** ****/ callback = apply;
      /** ****/
    } else {
      /** ****/ hotApplyOnUpdate = apply;
      /** ****/ callback =
        callback ||
        function (err) {
          /** ****/ if (err) throw err;
          /** ****/
        };
      /** ****/
    }
    /** ****/ hotSetStatus('check');
    /** ****/ hotDownloadManifest((err, update) => {
      /** ****/ if (err) return callback(err);
      /** ****/ if (!update) {
        /** ****/ hotSetStatus('idle');
        /** ****/ callback(null, null);
        /** ****/ return;
        /** ****/
      }
      /** ****/

      /** ****/ hotRequestedFilesMap = {};
      /** ****/ hotAvailibleFilesMap = {};
      /** ****/ hotWaitingFilesMap = {};
      /** ****/ for (let i = 0; i < update.c.length; i++) /** ****/ {
        hotAvailibleFilesMap[update.c[i]] = true;
      }
      /** ****/ hotUpdateNewHash = update.h;
      /** ****/

      /** ****/ hotSetStatus('prepare');
      /** ****/ hotCallback = callback;
      /** ****/ hotUpdate = {};
      /** ****/ const chunkId = 0;
      /** ****/ {
        // eslint-disable-line no-lone-blocks
        /** ****/ /* globals chunkId */
        /** ****/ hotEnsureUpdateChunk(chunkId);
        /** ****/
      }
      /** ****/ if (
        hotStatus === 'prepare' &&
        hotChunksLoading === 0 &&
        hotWaitingFiles === 0
      ) {
        /** ****/ hotUpdateDownloaded();
        /** ****/
      }
      /** ****/
    });
    /** ****/
  }
  /** ****/

  /** ****/ function hotAddUpdateChunk(chunkId, moreModules) {
    // eslint-disable-line no-unused-vars
    /** ****/ if (
      !hotAvailibleFilesMap[chunkId] ||
      !hotRequestedFilesMap[chunkId]
    ) {
      /** ****/ return;
    }
    /** ****/ hotRequestedFilesMap[chunkId] = false;
    /** ****/ for (const moduleId in moreModules) {
      /** ****/ if (
        Object.prototype.hasOwnProperty.call(moreModules, moduleId)
      ) {
        /** ****/ hotUpdate[moduleId] = moreModules[moduleId];
        /** ****/
      }
      /** ****/
    }
    /** ****/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
      /** ****/ hotUpdateDownloaded();
      /** ****/
    }
    /** ****/
  }
  /** ****/

  /** ****/ function hotEnsureUpdateChunk(chunkId) {
    /** ****/ if (!hotAvailibleFilesMap[chunkId]) {
      /** ****/ hotWaitingFilesMap[chunkId] = true;
      /** ****/
    } else {
      /** ****/ hotRequestedFilesMap[chunkId] = true;
      /** ****/ hotWaitingFiles++;
      /** ****/ hotDownloadUpdateChunk(chunkId);
      /** ****/
    }
    /** ****/
  }
  /** ****/

  /** ****/ function hotUpdateDownloaded() {
    /** ****/ hotSetStatus('ready');
    /** ****/ const callback = hotCallback;
    /** ****/ hotCallback = null;
    /** ****/ if (!callback) return;
    /** ****/ if (hotApplyOnUpdate) {
      /** ****/ hotApply(hotApplyOnUpdate, callback);
      /** ****/
    } else {
      /** ****/ const outdatedModules = [];
      /** ****/ for (const id in hotUpdate) {
        /** ****/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
          /** ****/ outdatedModules.push(toModuleId(id));
          /** ****/
        }
        /** ****/
      }
      /** ****/ callback(null, outdatedModules);
      /** ****/
    }
    /** ****/
  }
  /** ****/

  /** ****/ function hotApply(options, callback) {
    /** ****/ if (hotStatus !== 'ready') {
      throw new Error('apply() is only allowed in ready status');
    }
    /** ****/ if (typeof options === 'function') {
      /** ****/ callback = options;
      /** ****/ options = {};
      /** ****/
    } else if (options && typeof options === 'object') {
      /** ****/ callback =
        callback ||
        function (err) {
          /** ****/ if (err) throw err;
          /** ****/
        };
      /** ****/
    } else {
      /** ****/ options = {};
      /** ****/ callback =
        callback ||
        function (err) {
          /** ****/ if (err) throw err;
          /** ****/
        };
      /** ****/
    }
    /** ****/

    /** ****/ function getAffectedStuff(module) {
      /** ****/ const outdatedModules = [module];
      /** ****/ const outdatedDependencies = {};
      /** ****/

      /** ****/ const queue = outdatedModules.slice();
      /** ****/ while (queue.length > 0) {
        /** ****/ const moduleId = queue.pop();
        /** ****/ var module = installedModules[moduleId];
        /** ****/ if (!module || module.hot._selfAccepted) /** ****/ continue;
        /** ****/ if (module.hot._selfDeclined) {
          /** ****/ return new Error(
            `Aborted because of self decline: ${moduleId}`
          );
          /** ****/
        }
        /** ****/ if (moduleId === 0) {
          /** ****/ return;
          /** ****/
        }
        /** ****/ for (let i = 0; i < module.parents.length; i++) {
          /** ****/ const parentId = module.parents[i];
          /** ****/ const parent = installedModules[parentId];
          /** ****/ if (parent.hot._declinedDependencies[moduleId]) {
            /** ****/ return new Error(
              `Aborted because of declined dependency: ${moduleId} in ${parentId}`
            );
            /** ****/
          }
          /** ****/ if (outdatedModules.indexOf(parentId) >= 0) continue;
          /** ****/ if (parent.hot._acceptedDependencies[moduleId]) {
            /** ****/ if (!outdatedDependencies[parentId]) {
              /** ****/ outdatedDependencies[parentId] = [];
            }
            /** ****/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
            /** ****/ continue;
            /** ****/
          }
          /** ****/ delete outdatedDependencies[parentId];
          /** ****/ outdatedModules.push(parentId);
          /** ****/ queue.push(parentId);
          /** ****/
        }
        /** ****/
      }
      /** ****/

      /** ****/ return [outdatedModules, outdatedDependencies];
      /** ****/
    }
    /** ****/

    /** ****/ function addAllToSet(a, b) {
      /** ****/ for (let i = 0; i < b.length; i++) {
        /** ****/ const item = b[i];
        /** ****/ if (a.indexOf(item) < 0) /** ****/ a.push(item);
        /** ****/
      }
      /** ****/
    } // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
    /** ****/

    /** ****/ /** ****/ /** ****/ const outdatedDependencies = {};
    /** ****/ const outdatedModules = [];
    /** ****/ const appliedUpdate = {};
    /** ****/ for (const id in hotUpdate) {
      /** ****/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
        /** ****/ var moduleId = toModuleId(id);
        /** ****/ const result = getAffectedStuff(moduleId);
        /** ****/ if (!result) {
          /** ****/ if (options.ignoreUnaccepted) /** ****/ continue;
          /** ****/ hotSetStatus('abort');
          /** ****/ return callback(
            new Error(`Aborted because ${moduleId} is not accepted`)
          );
          /** ****/
        }
        /** ****/ if (result instanceof Error) {
          /** ****/ hotSetStatus('abort');
          /** ****/ return callback(result);
          /** ****/
        }
        /** ****/ appliedUpdate[moduleId] = hotUpdate[moduleId];
        /** ****/ addAllToSet(outdatedModules, result[0]);
        /** ****/ for (var moduleId in result[1]) {
          /** ****/ if (
            Object.prototype.hasOwnProperty.call(result[1], moduleId)
          ) {
            /** ****/ if (!outdatedDependencies[moduleId]) {
              /** ****/ outdatedDependencies[moduleId] = [];
            }
            /** ****/ addAllToSet(
              outdatedDependencies[moduleId],
              result[1][moduleId]
            );
            /** ****/
          }
          /** ****/
        }
        /** ****/
      }
      /** ****/
    } // Store self accepted outdated modules to require them later by the module system
    /** ****/

    /** ****/ /** ****/ const outdatedSelfAcceptedModules = [];
    /** ****/ for (var i = 0; i < outdatedModules.length; i++) {
      /** ****/ var moduleId = outdatedModules[i];
      /** ****/ if (
        installedModules[moduleId] &&
        installedModules[moduleId].hot._selfAccepted
      ) {
        /** ****/ outdatedSelfAcceptedModules.push({
          /** ****/ module: moduleId,
          /** ****/ errorHandler: installedModules[moduleId].hot._selfAccepted,
          /** ****/
        });
      }
      /** ****/
    } // Now in "dispose" phase
    /** ****/

    /** ****/ /** ****/ hotSetStatus('dispose');
    /** ****/ const queue = outdatedModules.slice();
    /** ****/ while (queue.length > 0) {
      /** ****/ var moduleId = queue.pop();
      /** ****/ var module = installedModules[moduleId];
      /** ****/ if (!module) continue;
      /** ****/

      /** ****/ const data = {}; // Call dispose handlers
      /** ****/

      /** ****/ /** ****/ const disposeHandlers = module.hot._disposeHandlers;
      /** ****/ for (var j = 0; j < disposeHandlers.length; j++) {
        /** ****/ var cb = disposeHandlers[j];
        /** ****/ cb(data);
        /** ****/
      }
      /** ****/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
      /** ****/

      /** ****/ /** ****/ module.hot.active = false; // remove module from cache
      /** ****/

      /** ****/ /** ****/ delete installedModules[moduleId]; // remove "parents" references from all children
      /** ****/

      /** ****/ /** ****/ for (var j = 0; j < module.children.length; j++) {
        /** ****/ const child = installedModules[module.children[j]];
        /** ****/ if (!child) continue;
        /** ****/ var idx = child.parents.indexOf(moduleId);
        /** ****/ if (idx >= 0) {
          /** ****/ child.parents.splice(idx, 1);
          /** ****/
        }
        /** ****/
      }
      /** ****/
    } // remove outdated dependency from module children
    /** ****/

    /** ****/ /** ****/ for (var moduleId in outdatedDependencies) {
      /** ****/ if (
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      ) {
        /** ****/ var module = installedModules[moduleId];
        /** ****/ var moduleOutdatedDependencies =
          outdatedDependencies[moduleId];
        /** ****/ for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
          /** ****/ var dependency = moduleOutdatedDependencies[j];
          /** ****/ var idx = module.children.indexOf(dependency);
          /** ****/ if (idx >= 0) module.children.splice(idx, 1);
          /** ****/
        }
        /** ****/
      }
      /** ****/
    } // Not in "apply" phase
    /** ****/

    /** ****/ /** ****/ hotSetStatus('apply');
    /** ****/

    /** ****/ hotCurrentHash = hotUpdateNewHash; // insert new code
    /** ****/

    /** ****/ /** ****/ for (var moduleId in appliedUpdate) {
      /** ****/ if (
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
      ) {
        /** ****/ modules[moduleId] = appliedUpdate[moduleId];
        /** ****/
      }
      /** ****/
    } // call accept handlers
    /** ****/

    /** ****/ /** ****/ let error = null;
    /** ****/ for (var moduleId in outdatedDependencies) {
      /** ****/ if (
        Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
      ) {
        /** ****/ var module = installedModules[moduleId];
        /** ****/ var moduleOutdatedDependencies =
          outdatedDependencies[moduleId];
        /** ****/ const callbacks = [];
        /** ****/ for (var i = 0; i < moduleOutdatedDependencies.length; i++) {
          /** ****/ var dependency = moduleOutdatedDependencies[i];
          /** ****/ var cb = module.hot._acceptedDependencies[dependency];
          /** ****/ if (callbacks.indexOf(cb) >= 0) continue;
          /** ****/ callbacks.push(cb);
          /** ****/
        }
        /** ****/ for (var i = 0; i < callbacks.length; i++) {
          /** ****/ var cb = callbacks[i];
          /** ****/ try {
            /** ****/ cb(outdatedDependencies);
            /** ****/
          } catch (err) {
            /** ****/ if (!error) /** ****/ error = err;
            /** ****/
          }
          /** ****/
        }
        /** ****/
      }
      /** ****/
    } // Load self accepted modules
    /** ****/

    /** ****/ /** ****/ for (
      var i = 0;
      i < outdatedSelfAcceptedModules.length;
      i++
    ) {
      /** ****/ const item = outdatedSelfAcceptedModules[i];
      /** ****/ var moduleId = item.module;
      /** ****/ hotCurrentParents = [moduleId];
      /** ****/ try {
        /** ****/ __webpack_require__(moduleId);
        /** ****/
      } catch (err) {
        /** ****/ if (typeof item.errorHandler === 'function') {
          /** ****/ try {
            /** ****/ item.errorHandler(err);
            /** ****/
          } catch (err) {
            /** ****/ if (!error) /** ****/ error = err;
            /** ****/
          }
          /** ****/
        } else if (!error) /** ****/ error = err;
        /** ****/
      }
      /** ****/
    } // handle errors in accept handlers and self accepted module load
    /** ****/

    /** ****/ /** ****/ if (error) {
      /** ****/ hotSetStatus('fail');
      /** ****/ return callback(error);
      /** ****/
    }
    /** ****/

    /** ****/ hotSetStatus('idle');
    /** ****/ callback(null, outdatedModules);
    /** ****/
  } // The module cache
  /** ****/
  /** ****/ /** ****/ var installedModules = {}; // The require function
  /** ****/
  /** ****/ /** ****/ function __webpack_require__(moduleId) {
    /** ****/
    /** ****/ // Check if module is in cache
    /** ****/ if (installedModules[moduleId]) {
      /** ****/ return installedModules[moduleId].exports;
    } // Create a new module (and put it into the cache)
    /** ****/
    /** ****/ /** ****/ const module = (installedModules[moduleId] = {
      /** ****/ exports: {},
      /** ****/ id: moduleId,
      /** ****/ loaded: false,
      /** ****/ hot: hotCreateModule(moduleId),
      /** ****/ parents: hotCurrentParents,
      /** ****/ children: [],
      /** ****/
    }); // Execute the module function
    /** ****/
    /** ****/ /** ****/ modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      hotCreateRequire(moduleId)
    ); // Flag the module as loaded
    /** ****/
    /** ****/ /** ****/ module.loaded = true; // Return the exports of the module
    /** ****/
    /** ****/ /** ****/ return module.exports;
    /** ****/
  } // expose the modules object (__webpack_modules__)
  /** ****/
  /** ****/
  /** ****/ /** ****/ __webpack_require__.m = modules; // expose the module cache
  /** ****/
  /** ****/ /** ****/ __webpack_require__.c = installedModules; // __webpack_public_path__
  /** ****/
  /** ****/ /** ****/ __webpack_require__.p = '/static/'; // __webpack_hash__
  /** ****/
  /** ****/ /** ****/ __webpack_require__.h = function () {
    return hotCurrentHash;
  }; // Load entry module and return exports
  /** ****/
  /** ****/ /** ****/ return hotCreateRequire(0)(0);
  /** ****/
}(
  /** **********************************************************************/
  /** ****/ [
    /* 0 */
    /** */ function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__(1);

      /** */
    },
    /* 1 */
    /** */ function (module, exports, __webpack_require__) {
      /* WEBPACK VAR INJECTION */ (function (process) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = {
          a: 'test client',
        };
        module.exports = exports.default;

        (function register() {
          /* react-hot-loader/webpack */ if (
            process.env.NODE_ENV !== 'production'
          ) {
            if (typeof __REACT_HOT_LOADER__ === 'undefined') {
              return;
            }
            if (typeof module.exports === 'function') {
              __REACT_HOT_LOADER__.register(
                module.exports,
                'module.exports',
                '/Users/wujingfeng/Github/beidou/packages/beidou-core/test/fixtures/apps/webpack/client/pages/home/index.jsx'
              );
              return;
            }
            for (const key in module.exports) {
              if (!Object.prototype.hasOwnProperty.call(module.exports, key)) {
                continue;
              }
              let namedExport = void 0;
              try {
                namedExport = module.exports[key];
              } catch (err) {
                continue;
              }
              __REACT_HOT_LOADER__.register(
                namedExport,
                key,
                '/Users/wujingfeng/Github/beidou/packages/beidou-core/test/fixtures/apps/webpack/client/pages/home/index.jsx'
              );
            }
          }
        }());
        /* WEBPACK VAR INJECTION */
      }.call(exports, __webpack_require__(2)));

      /** */
    },
    /* 2 */
    /** */ function (module, exports) {
      // shim for using process in browser
      const process = (module.exports = {});

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      let cachedSetTimeout;
      let cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      }());
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          // normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if (
          (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
          setTimeout
        ) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          // normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if (
          (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
          clearTimeout
        ) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      let queue = [];
      let draining = false;
      let currentQueue;
      let queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        const timeout = runTimeout(cleanUpNextTick);
        draining = true;

        let len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        const args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (let i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) {
        return [];
      };

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };

      /** */
    },
    /** ****/
  ]
));
// # sourceMappingURL=index.js.map?bd20cc45043f6015f1b0
