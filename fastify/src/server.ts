import app from './app';


const { PORT = 8000 } = process.env;


export const start = async () => {
    try {
        await app.listen({ port: Number(PORT), host: '0.0.0.0' }, (address) => {
            app.log.info(address);
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
