"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _schema = /*#__PURE__*/ _interopRequireDefault(require("../login/schema"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const schema = {
    body: {
        type: 'object',
        required: [
            'firstName',
            ..._schema.default.body.required
        ],
        properties: {
            ..._schema.default.body.properties,
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            }
        }
    }
};
const _default = schema;
