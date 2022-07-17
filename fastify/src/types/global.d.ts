

// @ts-expect-error export
export declare module 'fastify' {
    interface FastifyRequest {
        user: {
            id: string
            name: string
            email: string
        }
    }

    interface FastifyInstance {
        prisma: import('@prisma/client').PrismaClient
    }
}

