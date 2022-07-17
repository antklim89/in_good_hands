import { resolve } from 'path';

import { generateApi } from 'swagger-typescript-api';

import app from './app';


const { PORT = 8000 } = process.env;


export const start = async () => {
    try {
        await app.listen({ port: Number(PORT), host: '0.0.0.0' }, () => {
            generateApi({
                name: 'index.ts',
                output: resolve(process.cwd(), './src/swagger'),
                spec: app.swagger() as import('swagger-schema-official').Spec,
                httpClientType: 'axios', // or "fetch"
                defaultResponseAsSuccess: true,
                generateRouteTypes: true,
                generateResponses: true,
                toJS: false,
                extractRequestParams: false,
                extractRequestBody: false,
                defaultResponseType: false,
                singleHttpClient: true,
                cleanOutput: false,
                enumNamesAsValues: false,
                moduleNameFirstTag: false,
                generateUnionEnums: false,
            }).catch(console.error);
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
