import { FC } from 'react';


const Layout: FC = ({ children }) => {
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

