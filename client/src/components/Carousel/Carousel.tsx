import { FC, lazy, Suspense } from 'react';

import { CarouselProps } from './Carousel.types';


const NukaCarousel = lazy(() => import('nuka-carousel'));

const Carousel: FC<CarouselProps> = ({ children, ...props }) => {

    return (
        <Suspense fallback={<div>{Array.isArray(children) ? children[0] : children}</div>}>
            <NukaCarousel
                {...props}
                defaultControlsConfig={{ nextButtonText: '>', prevButtonText: '<' }}
                renderBottomCenterControls={null}
            >
                {children}
            </NukaCarousel>
        </Suspense>
    );
};

export default Carousel;
