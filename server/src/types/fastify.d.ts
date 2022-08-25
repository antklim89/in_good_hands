import { Ad } from '@prisma/client';


export declare module 'fastify' {
    import type { JWTUser } from './JWTUser';


    export interface FastifyRequest {
        user: {
            id: string
            name: string
            email: string
        }

        checkUser(): JWTUser|null
        getUser(): JWTUser
        getAdOwner(adId: number): Promise<{user: JWTUser, ad: Ad}>
    }

    export interface FastifyInstance {
        prisma: import('@prisma/client').PrismaClient
    }
}


