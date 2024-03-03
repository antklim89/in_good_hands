import path from 'path';

import { generateApi } from 'swagger-typescript-api';


async function generateSwaggerTypes() {
    try {
        await generateApi({
            name: 'index.ts',
            output: path.resolve('swagger'),
            url: 'http://localhost:8000/documentation/json',
            httpClientType: 'axios',
            defaultResponseAsSuccess: true,
            generateRouteTypes: true,
            generateResponses: true,
            toJS: false,
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

generateSwaggerTypes();
