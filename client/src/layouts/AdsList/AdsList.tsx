import { Container, Flex, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { useAdsList } from './AdsList.use';
import AdsListItem from './AdsListItem';

import PetSearch from '~/components/PetSearch';
import PetTypeSelect from '~/components/PetTypeSelect';


const AdsList: FC = () => {
    const { ads } = useAdsList();

    return (
        <Container my={8}>
            <Flex flexDirection={['column', 'row']}>
                <PetTypeSelect flex="1 1 0" mb={[1, 4]} />
                <PetSearch flex="3 1 0" mb={[1, 4]} />
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

