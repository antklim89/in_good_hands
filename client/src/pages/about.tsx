import type { NextPage } from 'next';

import Seo from '~/components/Seo';
import About from '~/layouts/About';


const AboutPage: NextPage = () => {
    return (
        <>
            <Seo title="About" />
            <About />
        </>
    );
};

export default AboutPage;
