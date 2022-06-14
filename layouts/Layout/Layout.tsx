import { FC, PropsWithChildren } from 'react';

import Seo from '~/components/Seo';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';


const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className="root">
            <Seo />
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;

