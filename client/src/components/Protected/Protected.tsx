import { FC } from 'react';

import { ProtectedProps } from './Protected.types';

import { useAuthContext } from '~/utils';


const Protected: FC<ProtectedProps> = ({
    children,
    protectIfAuth = false,
    initPlaceholder = null,
    disableProtection = false,
    protectedComponent = 'PROTECTED',
}) => {
    const { authInited, isAuth } = useAuthContext();

    if (disableProtection) return <>{children}</>;

    if (!authInited) return <>{initPlaceholder}</>;

    const isProtected = isAuth ? protectIfAuth : !protectIfAuth;

    if (isProtected) return <>{protectedComponent}</>;

    return <>{children}</>;
};

export default Protected;

