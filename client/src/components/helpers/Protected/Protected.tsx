import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { ProtectedProps } from './Protected.types';

import NotFoundPage from '~/pages/404';
import { useAuthContext } from '~/utils';


const Protected: FC<ProtectedProps> = ({
    children,
    redirect,
    notFound,
    render,
    fallback,
    authNeeded = true,
}) => {
    const { isAuth } = useAuthContext();
    const router = useRouter();

    const [isMounted, setIsMounted] = useState(false);

    const needProtect = authNeeded
        ? !isAuth
        : isAuth;

    useEffect(() => {
        setIsMounted(true);

        if (needProtect && redirect === 'back') {
            router.back();
            return;
        }
        if (needProtect && redirect) {
            router.replace(redirect);
        }
    }, [isAuth]);


    if (!isMounted) return <>{fallback || null}</>;

    if (needProtect && notFound) return <NotFoundPage />;

    if (needProtect && render) return <>{render}</>;

    if (needProtect) return null;

    return <>{children}</>;
};

export default Protected;
