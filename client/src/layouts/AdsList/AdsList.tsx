import { Container, HStack } from '@chakra-ui/react';
import { FC } from 'react';

import { AdsListProps } from './AdsList.types';
import AdsListItem from './AdsListItem';


const AdsList: FC<AdsListProps> = ({ ads }) => {
    return (
        <Container>
            <HStack>
                {ads.map((ad) => (
                    <AdsListItem key={ad.id} {...ad} />
                ))}
            </HStack>
        </Container>
    );
};

export default AdsList;

