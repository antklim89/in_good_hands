import { Auth } from '@in-good-hands/share/swager';
import { FastifyReply, FastifyRequest } from 'fastify';


export default async function handler(
    req: FastifyRequest<{Body: Auth.Update.RequestBody}>,
    repl: FastifyReply,
): Promise<Auth.Update.ResponseBody> {
    const user = req.getUser();
    const { body } = req;

    await req.server.prisma.user.update({
        data: body,
        where: { id: user.id },
        select: { id: true },
    });

    return repl.status(200).send();
}
