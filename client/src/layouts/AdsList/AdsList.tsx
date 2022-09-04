import { Container, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import AdsListItem from './AdsList.Item';
import { AdsListProps } from './AdsList.types';


const AdsList: FC<AdsListProps> = ({ ads }) => {
    return (
        <Container>
            <VStack>
                {ads.map((ad) => (
                    <AdsListItem key={ad.id} {...ad} />
                ))}
            </VStack>
        </Container>
    );
};

export default AdsList;

