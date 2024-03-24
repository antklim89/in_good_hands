import { FC, ReactNode, useEffect, useState } from 'react';


const NoSsr: FC<{children: ReactNode}> = ({ children }) => {
    const [inited, setInited] = useState(false);

    useEffect(() => {
        setInited(true);
    }, []);

    if (inited) return <>{children}</>;
    return null;
};

export default NoSsr;
