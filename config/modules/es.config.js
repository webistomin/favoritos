import capitalize from 'lodash.capitalize';
import banner from 'rollup-plugin-banner2';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import { baseConfig } from '../base.config';
import * as pkg from '../../package.json';
import { LIBRARY_NAME } from '../partials/libraryName';
import { BANNER_TEXT } from '../partials/bannerText';
import { EXTERNALS } from '../partials/externals';

// Get browserslist config

export const esConfig = {
  ...baseConfig,
  external: EXTERNALS,
  output: {
    name: capitalize(LIBRARY_NAME),
    file: pkg.module,
    format: 'esm',
    exports: 'named',
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
    banner(() => BANNER_TEXT),
  ],
};
