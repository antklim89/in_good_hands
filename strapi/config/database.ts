import path from 'path';


const database = ({ env }: { env: (a: string, b: string) => string}) => ({
    connection: {
        client: 'sqlite',
        connection: { filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', 'database/data.db')) },
        useNullAsDefault: true,
    },
});
export default database;
