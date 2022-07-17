

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
        swagger: () => import('swagger-schema-official').Spec
    }
}

