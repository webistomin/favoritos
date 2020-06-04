import capitalize from 'lodash.capitalize';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import { baseConfig } from '../base.config';
import { EXTERNALS } from '../partials/externals';
import { GLOBALS } from '../partials/globals';
import * as pkg from '../../package.json';
import { LIBRARY_NAME } from '../partials/libraryName';

export const unpkgConfig = {
  ...baseConfig,
  external: EXTERNALS,
  output: {
    compact: true,
    name: capitalize(LIBRARY_NAME),
    file: pkg.browser['dist/nanogram.js'],
    format: 'iife',
    globals: GLOBALS,
  },
  plugins: [
    ...baseConfig.plugins.common,
    babel(baseConfig.plugins.babel),
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
