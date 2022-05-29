import '~/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import Layout from '~/layouts/Layout';
import { theme } from '~/styles/theme';


const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
};

export default MyApp;
