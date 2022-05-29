import Head from 'next/head';
import { FC, memo } from 'react';

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '~/constants';

import { SeoProps } from './types';


const Seo: FC<SeoProps> = ({
    description,
    keywords = [],
    title,
}) => {

    const metaDescription = `${DEFAULT_DESCRIPTION} ${description || ''}`.trim();
    const metaTitle = `${title ? `${title} | ` : ''}${DEFAULT_TITLE}`;

    return (
        <Head>
            <title>{metaTitle}</title>
            <link href="/favicon.ico" rel="icon" />
            <meta content={metaDescription} name="description" />
            <meta content={[...keywords].join(', ')} name="keywords" />
            <meta content={metaDescription} name="description" />
            <meta content={metaTitle} property="og:title" />
            <meta content={metaDescription} property="og:description" />
            <meta content="website" property="og:type" />
            <meta content={metaTitle} name="twitter:title" />
            <meta content={metaDescription} name="twitter:description" />
        </Head>
    );
};

export default memo(Seo);
