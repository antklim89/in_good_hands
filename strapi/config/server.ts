
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const server = ({ env }: any) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: { keys: env.array('APP_KEYS') },
});

export default server;
