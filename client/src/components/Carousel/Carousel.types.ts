import { InternalCarouselProps } from 'nuka-carousel';
import { ReactNode } from 'react';


export interface CarouselProps extends Partial<InternalCarouselProps> {
    children: ReactNode
}
