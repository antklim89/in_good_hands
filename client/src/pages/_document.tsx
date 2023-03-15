import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import theme from '~/styles/theme';


const Document = () => {
    return (
        <Html lang="en">
            <Head>
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Head>
        </Html>
    );
};

export default Document;
