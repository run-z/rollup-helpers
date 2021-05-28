import nodeResolve from '@rollup/plugin-node-resolve';
import { builtinModules } from 'module';
import flatDts from 'rollup-plugin-flat-dts';
import sourcemaps from 'rollup-plugin-sourcemaps';
import ts from 'rollup-plugin-typescript2';
import typescript from 'typescript';

export default {
  input: {
    'rollup-helpers': './src/index.ts',
  },
  plugins: [
    ts({
      typescript,
      cacheRoot: 'target/.rts2_cache',
    }),
    nodeResolve(),
    sourcemaps(),
  ],
  external: [
    ...builtinModules,
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs',
    },
    {
      dir: '.',
      format: 'esm',
      sourcemap: true,
      entryFileNames: 'dist/[name].js',
      plugins: [
        flatDts({
          lib: true,
          compilerOptions: {
            declarationMap: true,
          },
        }),
      ],
    },
  ],
};
