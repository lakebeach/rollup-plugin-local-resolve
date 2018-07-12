import { statSync } from 'fs';
import path from 'path';

export default function localResolver(options = { extensions: ['.js'] }) {
  return {
    resolveId(importee, importer) {
      console.log(importee, importer);
      if (importee.indexOf('./') === -1) {
        return null;
      }

      if (!importer) {
        return null;
      }

      const { dir } = path.parse(importer);

      return options.extensions
        .reduce((agg, ext) => agg.concat([
          path.resolve(dir, `${importee}${ext}`),
          path.resolve(dir, importee, `index${ext}`),
        ]), [])
        .sort()
        .find((possibleImporteePath) => {
        // TODO: This should be asynchronous
          try {
            return statSync(possibleImporteePath).isFile();
          } catch (e) {
            return false;
          }
        });
    },
  };
}
