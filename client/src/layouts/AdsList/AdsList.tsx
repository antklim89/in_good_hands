import { Container, VStack } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';


import AdsListItem from './AdsList.Item';
import { AdsListProps } from './AdsList.types';

import { api, useInfinityScroll } from '~/utils';


const AdsList: FC<AdsListProps> = ({ ads: propsAds }) => {
    const [ads, setAds] = useState(propsAds);
    const { addEvent } = useInfinityScroll(async () => {
        const { data: newAds } = await api().ad.previewList({
            cursor: ads.slice().pop()?.id,
        });

        setAds((prevAds) => [...prevAds, ...newAds]);

        if (newAds.length > 0) addEvent();
    });

    useEffect(addEvent, []);

    return (
        <Container>
            <VStack mb={8}>
                {ads.map((ad) => (
                    <AdsListItem key={ad.id} {...ad} />
                ))}
            </VStack>
        </Container>
    );
};

export default AdsList;

