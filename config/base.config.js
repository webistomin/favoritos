import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { LIBRARY_NAME } from './partials/libraryName';

export const baseConfig = {
  input: `./src/${LIBRARY_NAME}.ts`,
  plugins: {
    common: [
      json(),
      typescript(),
      sourceMaps(),
      terser({
        output: {
          ecma: 5,
          comments: false,
        },
      }),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
    },
  },
  watch: {
    include: 'src/**',
  },
};
