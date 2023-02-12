import { ReactNode } from 'react';


export interface ProtectedProps {
     notFound?: boolean
     redirect?: string | 'back'
     authNeeded?: boolean
     render?: ReactNode
     fallback?: ReactNode
     children?: ReactNode
 }
