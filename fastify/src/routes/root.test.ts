import app from '../app';


it('default root route', async () => {
    const data = await app.inject({ url: '/', method: 'POST' });
    await app.close();
});

// inject callback style:
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
