import { authHeaderSchema } from '@/schemas';


const schema = {
    tags: ['image'],
    operationId: 'Upload',
    consumes: ['multipart/form-data'],
    response: {
        201: { type: 'number' },
    },
    // querystring: {
    //     type: 'object',
    //     properties: {
    //         adId: { type: 'number' },
    //     },
    // },
    // body: {
    //     type: 'object',
    //     properties: {
    //         file: {
    //             type: 'string', format: 'binary',
    //         },
    //     },
    // },
    // headers: authHeaderSchema,
};

export default schema;
