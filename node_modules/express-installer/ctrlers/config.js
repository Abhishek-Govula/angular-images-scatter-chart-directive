module.exports = function(config) {
  var Config = {};
  Config.check = function(callback) {
    config.findOne({}).exec(function(err, c) {
      callback(err, !!c, c);
    });
  };
  return Config;
}