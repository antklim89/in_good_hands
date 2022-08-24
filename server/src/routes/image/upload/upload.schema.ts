import { authHeaderSchema } from '@/schemas';


const schema = {
    tags: ['image'],
    operationId: 'Upload',
    consumes: ['multipart/form-data'],
    response: {
        201: { type: 'null' },
    },
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

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFudG9uQG1haWwucnUiLCJpZCI6ImU4ODVmOTNjLTRlNmEtNDY0Yi1iYjlhLWZmZDYxYjcwYmI2MCIsIm5hbWUiOiJBbnRvbiIsImlhdCI6MTY2MTExNDM0MX0.wdYBVLobrXGfcxjDWq4pPSKk2xHMOZJsdtLIAJ1TMbQ
*/
