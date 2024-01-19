

export declare module 'fastify' {
    export interface FastifyRequest {
        user: {
            id: string
            name: string
            email: string
        }

        tryGetUser(): import('./JWTUser').JWTUser | null
        getUser(): import('./JWTUser').JWTUser
        getAdOwner(adId: number): Promise<{user: import('./JWTUser').JWTUser, ad: import('@prisma/client').Ad}>
    }

    interface FastifyInstance {
        prisma: import('@prisma/client').PrismaClient
    }
}
