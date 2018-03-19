'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = _interopDefault(require('path'));

function localResolver() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { extensions: ['.js'] };

  return {
    resolveId: function (importee, importer) {
      if (importee.indexOf('./') === -1) {
        return null;
      }

      if (!importer) {
        return null;
      }

      var _path$parse = path.parse(importer),
          dir = _path$parse.dir;

      return options.extensions.reduce(function (agg, ext) {
        return agg.concat([path.join(dir, '' + importee + ext), path.join(dir, importee, 'index' + ext)]);
      }, []).sort().find(function (possibleImporteePath) {
        // TODO: This should be asynchronous
        try {
          return fs.statSync(possibleImporteePath).isFile();
        } catch (e) {
          return false;
        }
      });
    }
  };
}

module.exports = localResolver;