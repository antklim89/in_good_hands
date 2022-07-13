/* eslint-disable no-console */
const { spawn } = require('child_process');
const fs = require('fs');
const { resolve } = require('path');

const { webpack } = require('webpack');
const nodeExternals = require('webpack-node-externals');


let childProcess;

webpack({
    entry: resolve(__dirname, 'src/server.ts'),

    devtool: false,

    target: 'node',

    watch: true,

    output: {
        filename: 'server.js',
        path: resolve(__dirname, './output'),
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'swc-loader',
                options: JSON.parse(fs.readFileSync(resolve(__dirname, '.swcrc'), 'utf-8')),
            },
        ],
    },
    externals: [
        nodeExternals({ allowlist: [/@simple-blog/], modulesDir: '../../node_modules' }),
        nodeExternals({ allowlist: [/@simple-blog/], modulesDir: './node_modules' }),
    ],

    resolve: {
        extensions: ['.ts'],
        alias: { '~': resolve(__dirname, './src/') },
    },

    mode: 'none',

    cache: false,

}, (_, stats) => {
    console.debug('Build in: ', stats.endTime - stats.startTime, ' ms');

    if (childProcess) childProcess.kill();

    childProcess = spawn('node', [resolve(__dirname, './output/server.js')], {});

    childProcess.stdout.on('data', (data) => {
        console.log(data.toString().trim());
    });

    childProcess.stderr.on('data', (data) => {
        console.error(data.toString().trim());
    });
});
