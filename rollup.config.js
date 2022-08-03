import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import scss from 'rollup-plugin-scss';
import url from '@rollup/plugin-url';
import html from '@rollup/plugin-html';
import { string } from 'rollup-plugin-string';

const production = !process.env.ROLLUP_WATCH;
const directory = production ? 'prod' : 'dev';

export default {
   input: 'src/app.ts',
   output: {
      file: `dist/${directory}/app.bundle.js`,
      format: 'iife',
      name: 'app',
   },

   plugins: [
      resolve(),
      commonjs(),
      scss({ insert: true }),
      html({ title: 'App', fileName: 'index.html' }),
      typescript({ module: 'ESNext' }),
      url({ fileName: 'assets/[name][extname]' }),
      string({ include: '**/*.glsl' }),
      production && terser(),
      !production && livereload(),
      !production &&
         serve({
            contentBase: 'dist/dev',
            port: 3000,
            open: true,
         }),
   ],
};
