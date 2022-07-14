"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const schema = {
    body: {
        type: 'object',
        required: [
            'password',
            'email'
        ],
        properties: {
            password: {
                type: 'string'
            },
            email: {
                type: 'string'
            }
        }
    }
};
const _default = schema;
