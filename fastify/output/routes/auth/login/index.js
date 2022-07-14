"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>login
});
const _bcryptjs = /*#__PURE__*/ _interopRequireDefault(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interopRequireDefault(require("jsonwebtoken"));
const _lodash = /*#__PURE__*/ _interopRequireDefault(require("lodash"));
const _register = require("../register/index");
const _schema = /*#__PURE__*/ _interopRequireDefault(require("./schema"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function login(fastify) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: _schema.default,
        async handler (req, repl) {
            const { email , password  } = req.body;
            const user = _register.FAKE_DB.find((u)=>u.email === email);
            if (!user) {
                return repl.status(400).send({
                    message: 'E-mail or password is not valid.'
                });
            }
            const isValidPassword = await _bcryptjs.default.compare(password, user.hash);
            if (!isValidPassword) {
                return repl.status(400).send({
                    message: 'E-mail or password is not valid.'
                });
            }
            const responseUser = _lodash.default.pick(user, [
                'email',
                'firstName',
                'lastName'
            ]);
            const token = _jsonwebtoken.default.sign(responseUser, 'SECRET');
            return {
                user: responseUser,
                token
            };
        }
    });
}
