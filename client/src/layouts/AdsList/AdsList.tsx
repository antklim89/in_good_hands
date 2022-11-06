import { Container, Flex, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import AdsListItem from './AdsList.Item';
import { AdsListProps } from './AdsList.types';
import { useAdsList } from './AdsList.use';

import PetSearch from '~/components/PetSearch';
import PetTypeSelect from '~/components/PetTypeSelect';


const AdsList: FC<AdsListProps> = (props) => {
    const { ads } = useAdsList(props);

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

