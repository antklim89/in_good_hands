import fp from 'fastify-plugin';

import { ClientException, verifyJWT } from '@/utils';


export default fp(async (app) => {
    app.addHook('preHandler', async (req) => {
        req.getUser = () => {
            const user = verifyJWT(req);
            if (user) return user;
            throw new ClientException('You are not authorized.', 401);
        };

        req.checkUser = () => {
            return verifyJWT(req);
        };

        req.getAdOwner = async (adId) => {
            const user = verifyJWT(req);
            if (!user) throw new ClientException('You are not authorized.', 401);


            const ad = await app.prisma.ad.findUnique({
                where: { id: adId },
            });

            if (!ad || ad.ownerId !== user.id) {
                throw new ClientException('You are not allowed to update this ad.', 403);
            }

            return { user, ad };
        };
    });
});
