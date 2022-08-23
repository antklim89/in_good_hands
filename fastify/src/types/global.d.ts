

declare module 'fastify' {
    import type { JWTUser } from './JWTUser';


    interface FastifyRequest {
        user: {
            id: string
            name: string
            email: string
        }

        checkUser: () => JWTUser|null
        getUser: () => JWTUser
    }

    interface FastifyInstance {
        prisma: import('@prisma/client').PrismaClient
    }
}


declare module 'form-auto-content' {
    export default function formAutoContent(
        arg: Record<string, unknown>
    ): { payload: Record<string, unknown>, headers: Record<string, string> };
}
