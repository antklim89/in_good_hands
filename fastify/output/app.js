"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _path = /*#__PURE__*/ _interopRequireDefault(require("path"));
const _autoload = require("@fastify/autoload");
const _fastify = /*#__PURE__*/ _interopRequireDefault(require("fastify"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _fastify.default)({
    logger: false
});
app.register(_autoload.fastifyAutoload, {
    dir: _path.default.join(__dirname, 'plugins'),
    options: {}
});
app.register(_autoload.fastifyAutoload, {
    dir: _path.default.join(__dirname, 'routes'),
    options: {}
});
const _default = app;
