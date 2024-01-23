import { Container, Flex, Spinner, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { useAdsList } from './AdsList.use';
import AdsListItem from './AdsListItem';

import PetSearch from '~/components/features/PetSearch';
import PetTypeSelect from '~/components/features/PetTypeSelect';


const AdsList: FC = () => {
    const { ads, isLoading } = useAdsList();

    return (
        <Container my={8}>
            <Flex flexDirection="column">
                <PetTypeSelect flex="1 1 0" mb={[1, 4]} />
                <PetSearch flex="3 1 0" mb={[1, 4]} />
            </Flex>
            <VStack>
                {ads.map((ad) => (
                    <AdsListItem key={ad.id} {...ad} />
                ))}
                {isLoading
                    ? (
                        <Flex justifyContent="center">
                            <Spinner size="xl" />
                        </Flex>
                    )
                    : null}
            </VStack>
        </Container>
    );
};

export default AdsList;

