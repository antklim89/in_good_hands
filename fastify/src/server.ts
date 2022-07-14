import app from './app';


const { PORT = 8000 } = process.env;


export const start = async () => {
    try {
        await app.listen({ port: Number(PORT) }, () => {
            // eslint-disable-next-line no-console
            console.log(`Server started on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
start();
