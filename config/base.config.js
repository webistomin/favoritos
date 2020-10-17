import json from '@rollup/plugin-json';
import typescript from 'rollup-plugin-typescript2';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import { LIBRARY_NAME } from './partials/libraryName';
import fs from 'fs';
import path from 'path';

const esbrowserslist = fs.readFileSync(path.resolve('.', '.browserslistrc')).toString().split('\n');

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
      presets: [
        [
          '@babel/preset-env',
          {
            targets: esbrowserslist,
          },
        ],
      ],
    },
  },
  watch: {
    include: 'src/**',
  },
};
