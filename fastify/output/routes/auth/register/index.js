"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: ()=>register,
    FAKE_DB: ()=>FAKE_DB
});
const _bcryptjs = /*#__PURE__*/ _interopRequireDefault(require("bcryptjs"));
const _jsonwebtoken = /*#__PURE__*/ _interopRequireDefault(require("jsonwebtoken"));
const _schema = /*#__PURE__*/ _interopRequireDefault(require("./schema"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function register(fastify) {
    fastify.route({
        method: 'POST',
        url: '/',
        schema: _schema.default,
        async handler (req, repl) {
            const { email , password , firstName , lastName  } = req.body;
            const isUserExist = FAKE_DB.find((user)=>user.email === email);
            if (isUserExist) {
                return repl.status(409).send({
                    message: 'E-mail already exists.'
                });
            }
            const hash = await new Promise((resolve, reject)=>{
                _bcryptjs.default.hash(password, 8, (err, result)=>{
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
            const newUser = {
                email,
                hash,
                firstName,
                lastName
            };
            FAKE_DB.push(newUser);
            const token = _jsonwebtoken.default.sign(newUser, 'SECRET');
            return {
                user: {
                    email,
                    firstName,
                    lastName
                },
                token
            };
        }
    });
}
const FAKE_DB = [
    {
        email: 'example@mail.com',
        hash: '$2a$08$mVgFhWTwt3tviMEuS.WqAe/dvJLzPp8B4od9nUjKlDsBbDiWF5tXK',
        firstName: 'John',
        lastName: 'Smith'
    }, 
];
