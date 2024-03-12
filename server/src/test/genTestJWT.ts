import jwt from 'jsonwebtoken';
import { inject } from 'vitest';

import { JWTUser } from '@/types';


export function genTestJWT({ email, id, name }: JWTUser): string {
    const token = jwt.sign({ email, id, name }, inject('JWT_SECRET'));

    return token;
}
