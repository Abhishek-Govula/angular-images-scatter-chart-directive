var configCtrler = require('./ctrlers/config');

module.exports = function(app, configModel, callback) {
  var config = configCtrler(configModel);
  return function(req, res, next) {
    if (app.get('configed')) return next();
    config.check(function(err, installed, configs) {
      if (err) return next(err);
      if (installed) {
        app.locals.site = configs;
        if (isFunction(callback)) callback(configs);
        app.enable('configed');
        return next();
      } else {
        configModel.create(app.locals.site, function(err) {
          if (!err) app.enable('configed');
          next(err);
        });
      }
    });
  }
}

function isFunction(fn) {
  return fn && typeof (fn) === 'function';
}