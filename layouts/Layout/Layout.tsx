import { FC, PropsWithChildren } from 'react';

import Header from '~/layouts/Header';


const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className="root">
            <Header />
            <main>
                {children}
            </main>
            <footer>
                FOOTER
            </footer>
        </div>
    );
};

export default Layout;

