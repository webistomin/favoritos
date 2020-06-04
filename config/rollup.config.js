import minimist from 'minimist';

import {esConfig} from './modules/es.config';
import {cjsConfig} from './modules/cjs.config';
import {unpkgConfig} from './modules/iife.config';

const argv = minimist(process.argv.slice(2));

const buildFormats = [];

if (!argv.format || argv.format === 'es') {
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  buildFormats.push(cjsConfig);
}

if (!argv.format || argv.format === 'iife') {
  buildFormats.push(unpkgConfig);
}

export default buildFormats;
