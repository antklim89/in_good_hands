import { resolve } from 'path';

import { FastifyInstance } from 'fastify';
import { generateApi } from 'swagger-typescript-api';


export async function generateSwaggerTypes(app: FastifyInstance): Promise<void> {
    try {
        await generateApi({
            name: 'index.ts',
            output: resolve(process.cwd(), './src/swagger'),
            spec: app.swagger() as import('swagger-schema-official').Spec,
            httpClientType: 'axios',
            defaultResponseAsSuccess: true,
            generateRouteTypes: true,
            generateResponses: true,
            toJS: true,
            extractRequestParams: false,
            extractRequestBody: false,
            singleHttpClient: false,
            cleanOutput: false,
            enumNamesAsValues: false,
            moduleNameFirstTag: false,
            generateUnionEnums: false,
            silent: true,
        });
    } catch (error) {
        if (error instanceof Error) console.error('Swagger typescript gen error: \n', error.message);
    }
}
