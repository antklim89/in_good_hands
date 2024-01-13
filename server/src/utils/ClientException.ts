import type { FastifyError } from '@fastify/error';


export class ClientException implements FastifyError {
    code: string;

    name = ClientException.name;

    constructor(readonly message: string, readonly statusCode: number) {
        this.code = statusCode.toString();
    }
}
