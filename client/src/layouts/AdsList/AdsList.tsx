import { Container, Flex, VStack } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import AdsListItem from './AdsList.Item';

import PetSearch from '~/components/PetSearch';
import PetTypeSelect from '~/components/PetTypeSelect';
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
        <Container my={8}>
            <Flex flexDirection={['column', 'row']}>
                <PetTypeSelect flexBasis={['auto', 0]} flexGrow={[0, 1]} mb={[1, 4]} />
                <PetSearch flexBasis={['auto', 0]} flexGrow={[0, 2]} mb={[1, 4]} />
            </Flex>
            <VStack>
                {ads.map((ad) => (
                    <AdsListItem key={ad.id} {...ad} />
                ))}
            </VStack>
        </Container>
    );
};

export default AdsList;

