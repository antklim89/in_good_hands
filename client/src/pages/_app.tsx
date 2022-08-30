import 'core-js/es/global-this';
import '~/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import AuthProvider from '~/components/AuthProvider';
import Layout from '~/layouts/Layout';
import theme from '~/styles/theme';


const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </ChakraProvider>
    );
};

export default MyApp;
