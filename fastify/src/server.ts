import { resolve } from 'path';

import { PrismaClient } from '@prisma/client';
import { generateApi } from 'swagger-typescript-api';

import app from './app';


const { PORT = 8000 } = process.env;

export const start = async () => {
    try {
        const prisma = new PrismaClient();

        app.prisma = prisma;

        await app.listen({ port: Number(PORT), host: '0.0.0.0' }, () => {
            generateApi({
                name: 'index.ts',
                output: resolve(process.cwd(), './src/swagger'),
                spec: app.swagger() as import('swagger-schema-official').Spec,
                httpClientType: 'axios',
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
            }).catch((error) => console.error('Swagger typescript gen error: \n', error.message));
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
