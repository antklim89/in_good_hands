

// @ts-expect-error export
export declare module 'fastify' {
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

