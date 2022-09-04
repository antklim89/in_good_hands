import { Container, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import AdsListItem from './AdsList.Item';

import { api, useInfinityScroll } from '~/utils';


const AdsList: FC = () => {
    const { data: ads = [], mutate } = useSWR('ads-preview-list', () => api().ad.findMany().then((d) => d.data));

    const { addEvent } = useInfinityScroll(async () => {
        const { data: newAds } = await api().ad.findMany({
            cursor: ads.slice().pop()?.id,
        });

        mutate([...ads, ...newAds], { revalidate: false });

        if (newAds.length > 0) addEvent();
    });

    useEffect(() => {
        if (ads.length > 0) addEvent();
    }, []);


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

