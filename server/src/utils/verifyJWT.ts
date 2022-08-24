import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '@/constants';
import { JWTUser } from '@/types';


export function verifyJWT(req: FastifyRequest): JWTUser | null {
    const token = req.headers.authentication;
    if (typeof token !== 'string') return null;

    const data = jwt.verify(token, JWT_SECRET) as JWTUser;

    if (data.email && data.name && data.id) {
        return data;
    }

    return null;
}
