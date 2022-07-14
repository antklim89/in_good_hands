"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "start", {
    enumerable: true,
    get: ()=>start
});
const _app = /*#__PURE__*/ _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { PORT =8000  } = process.env;
const start = async ()=>{
    try {
        await _app.default.listen({
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
