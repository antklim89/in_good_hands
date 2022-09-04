import { Container, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';

import AdsListItem from './AdsList.Item';
import { AdsListProps } from './AdsList.types';


const AdsList: FC<AdsListProps> = ({ ads }) => {
    return (
        <Container>
            <Grid gap={5} gridTemplateColumns="repeat(2, 1fr)">
                {ads.map((ad) => (
                    <GridItem key={ad.id}>
                        <AdsListItem {...ad} />
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
};

export default AdsList;

