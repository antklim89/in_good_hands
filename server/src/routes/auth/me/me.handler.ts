import { Auth } from '@in-good-hands/share/swager';
import { FastifyReply, FastifyRequest } from 'fastify';


export default async function handler(req: FastifyRequest, repl: FastifyReply): Promise<Auth.Me.ResponseBody> {
    const user = req.getUser();
    const profile = await req.server.prisma.user.findUnique({
        where: { id: user.id },
    });

    return repl.status(200).send(profile);
}
