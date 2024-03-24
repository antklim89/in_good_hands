import 'core-js/es/global-this';
import '~/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import Layout from '~/components/layouts/Layout';
import AuthProvider from '~/components/providers/AuthProvider';
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
