import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '~/fastify/constants';


interface JWTUser {
    name: string;
    email: string;
    id: string;
}

interface GenerateJWTResult {
    token: string;
    user: JWTUser;
}

export function generateJWT({ email, id, name }: JWTUser): GenerateJWTResult {
    const token = jwt.sign({ email, id, name }, JWT_SECRET);

    return {
        token,
        user: { email, id, name },
    };
}
