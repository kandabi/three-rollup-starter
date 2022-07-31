import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import url from '@rollup/plugin-url';
import html from '@rollup/plugin-html';

const production = !process.env.ROLLUP_WATCH;
const directory = production ? 'prod' : 'dev';

export default {
   input: 'src/app.ts',
   output: {
      file: `dist/${directory}/app.bundle.js`,
      name: 'app',
      format: 'iife',
   },
   plugins: [
      resolve(),
      commonjs(),
      scss({ insert: true }),
      html({ fileName: 'index.html' }),
      typescript({ module: 'ESNext' }),
      url({ fileName: 'assets/[name][extname]' }),
      production && terser(),
   ],
};
