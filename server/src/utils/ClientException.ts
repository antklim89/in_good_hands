

export class ClientException extends Error {
    constructor(readonly message: string, readonly statusCode: number) {
        super(message);
    }
}
