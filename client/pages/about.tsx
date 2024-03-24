import type { NextPage } from 'next';

import About from '~/components/features/About';
import Seo from '~/components/helpers/Seo';


const AboutPage: NextPage = () => {
    return (
        <>
            <Seo title="About" />
            <About />
        </>
    );
};

export default AboutPage;
