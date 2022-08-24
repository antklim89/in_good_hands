

export declare module 'fastify' {
    import type { JWTUser } from './JWTUser';


    export interface FastifyRequest {
        user: {
            id: string
            name: string
            email: string
        }

        checkUser: () => JWTUser|null
        getUser: () => JWTUser
    }

    export interface FastifyInstance {
        prisma: import('@prisma/client').PrismaClient
    }
}


