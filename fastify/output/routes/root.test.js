"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interopRequireDefault(require("../app"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
it('default root route', async ()=>{
    const data = await _app.default.inject({
        url: '/',
        method: 'POST'
    });
    await _app.default.close();
}); // inject callback style:
 //
 // test('default root route', (t) => {
 //   t.plan(2)
 //   const app = await build(t)
 //
 //   app.inject({
 //     url: '/'
 //   }, (err, res) => {
 //     t.error(err)
 //     t.same(JSON.parse(res.payload), { root: true })
 //   })
 // })
