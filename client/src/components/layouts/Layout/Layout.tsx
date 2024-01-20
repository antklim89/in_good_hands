import { FC, PropsWithChildren } from 'react';

import Seo from '~/components/helpers/Seo';
import Footer from '~/components/layouts/Footer';
import Header from '~/components/layouts/Header';


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

