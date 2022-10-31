import { Container, Flex, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import AdsListItem from './AdsList.Item';
import { AdsListProps } from './AdsList.types';

import PetSearch from '~/components/PetSearch';
import PetTypeSelect from '~/components/PetTypeSelect';
import { api, useInfinityScroll, useUpdate } from '~/utils';


const AdsList: FC<AdsListProps> = ({ ads: initAds }) => {
    const { query } = useRouter();
    const [ads, setAds] = useState(initAds);


    const { addEvent } = useInfinityScroll(async () => {
        const { data: newAds } = await api().ad.findMany({
            cursor: ads.slice().pop()?.id,
            searchType: query.type as 'cat' | 'dog' | 'bird' | 'aquarium' | 'rodent' | undefined,
            search: query.search as string,
        });
        setAds([...ads, ...newAds]);
        if (newAds.length > 0) addEvent();
    }, 2000);

    useEffect(() => {
        if (ads.length > 0) addEvent();
    }, []);

    useUpdate(() => {
        setAds(initAds);
    }, [query]);


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

