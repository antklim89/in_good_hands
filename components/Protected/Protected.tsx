import { FC } from 'react';

import { useAuthContext } from '~/utils';

import { ProtectedProps } from './Protected.types';


const Protected: FC<ProtectedProps> = ({
    children,
    isAuthRequired = true,
    initPlaceholder = null,
    protectedComponent = 'PROTECTED',
}) => {
    const { authInited, isAuth } = useAuthContext();

    if (!authInited) return <>{initPlaceholder}</>;

    const isProtected = isAuth ? !isAuthRequired : isAuthRequired;

    if (isProtected) return (
        <>
            {protectedComponent}
        </>
    );
    return (
        <>
            {children}
        </>
    );
};

export default Protected;

