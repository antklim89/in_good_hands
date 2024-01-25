import * as esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';


await esbuild.build({
    entryPoints: ['src/server.ts'],
    bundle: true,
    outfile: 'output/server.js',
    platform: 'node',
    target: 'node20',
    format: 'esm',
    minify: false,
    minifyIdentifiers: false,
    minifySyntax: false,
    minifyWhitespace: false,
    plugins: [nodeExternalsPlugin({ allowList: ['@in-good-hands/share'] })],
});
