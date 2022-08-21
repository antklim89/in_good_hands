import { FastifyInstance, FastifyRequest } from 'fastify';

import schema from './upload.schema';


export default async function newAdRoute(app: FastifyInstance) {
    app.route({
        method: 'POST',
        url: '/',
        schema,
        async handler(req: FastifyRequest, repl) {
            // const user = req.getUser();


            const files = await req.saveRequestFiles();
            console.log('==== \n files', files);

            return repl.status(201).send();
        },
    });
}
