import { FC, PropsWithChildren } from 'react';


const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    return (
        <div className="root">
            <header>
                HEADER
            </header>
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

