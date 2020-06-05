import capitalize from 'lodash.capitalize';
import banner from 'rollup-plugin-banner2';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
// import webWorkerLoader from 'rollup-plugin-web-worker-loader';

import { baseConfig } from '../base.config';
import { EXTERNALS } from '../partials/externals';
import { GLOBALS } from '../partials/globals';
import { LIBRARY_NAME } from '../partials/libraryName';
import { BANNER_TEXT } from '../partials/bannerText';
import * as pkg from '../../package.json';

export const cjsConfig = {
  ...baseConfig,
  external: EXTERNALS,
  output: {
    name: capitalize(LIBRARY_NAME),
    compact: true,
    file: pkg.main,
    format: 'cjs',
    globals: GLOBALS,
  },
  plugins: [
    ...baseConfig.plugins.common,
    // webWorkerLoader(),
    babel(baseConfig.plugins.babel),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    banner(() => BANNER_TEXT),
  ],
};
