"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "start", {
    enumerable: true,
    get: ()=>start
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
const { PORT =8000  } = process.env;
app.register(_autoload.fastifyAutoload, {
    dir: _path.default.join(__dirname, 'plugins'),
    options: {}
});
app.register(_autoload.fastifyAutoload, {
    dir: _path.default.join(__dirname, 'routes'),
    options: {}
});
const start = async ()=>{
    try {
        await app.listen({
            port: Number(PORT)
        }, ()=>{
            // eslint-disable-next-line no-console
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
