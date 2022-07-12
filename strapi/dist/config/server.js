"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const server = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: { keys: env.array('APP_KEYS') },
});
exports.default = server;
