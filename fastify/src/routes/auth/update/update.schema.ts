

const schema = {
    tags: ['auth'],
    operationId: 'Update',
    body: {
        type: 'object',
        required: ['email', 'name'],
        properties: {
            name: { type: 'string', minLength: 3, maxLength: 200, default: 'Jack' },
            email: { type: 'string', default: 'jack@mail.com' },
        },
    },
    response: { 200: { type: 'null' } },
    headers: {
        type: 'object',
        required: ['auth'],
        properties: { auth: { type: 'string', default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAbWFpbC5jb20iLCJuYW1lIjoiSm9obiIsImlkIjoiMDVmMDE4MmQtMzg1YS00NmRjLWJjMDItZGEwNGZjNDJkMDNlIiwiaWF0IjoxNjU3ODQ2NjUxfQ.MUqJcbImYImsUGWY2lJtdmFMSnebf4g8mqs9rsj2zqY' } },
    },
};

export default schema;
