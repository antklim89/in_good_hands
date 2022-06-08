import zod from 'zod';

import type { authSchema } from './Auth.schema';


export interface AuthProps {
     type: 'login' | 'register'
}


export type AuthType = zod.infer<typeof authSchema>
