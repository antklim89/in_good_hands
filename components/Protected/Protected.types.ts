import { ReactNode } from 'react';


export interface ProtectedProps {
     children: ReactNode
     isAuthRequired?: boolean
     initPlaceholder?: ReactNode
     protectedComponent?: ReactNode
}
