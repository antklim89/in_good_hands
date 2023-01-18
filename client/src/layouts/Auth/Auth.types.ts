import { ReactNode } from 'react';
import zod from 'zod';

import type { authSchema } from './Auth.schema';


export interface AuthProps {
     type: 'login' | 'register'
     children: (args: { onOpen: () => void }) => ReactNode
}


export interface AuthFormProps {
     type: 'login' | 'register'
     onClose: () => void
}


export type AuthType = zod.infer<typeof authSchema>
