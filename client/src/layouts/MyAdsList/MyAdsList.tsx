import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import useSWR from 'swr';

import MyAdsListItem from './MyAdsList.Item';

import { api } from '~/utils';


const MyAdsList: FC = () => {
    const [hasNext, setHasNext] = useState(false);

    const { data: ads = [], mutate } = useSWR('my-ads', async () => {
        const { data } = await api().ad.findMyAds();
        if (data.length > 0) setHasNext(true);
        return data;
    });

    const lastAdId = ads?.slice?.().pop()?.id;

    const handleFetchMore = useCallback(async () => {
        const nextAds = await api().ad.findMyAds({ cursor: lastAdId }).then((d) => d.data);
        if (nextAds.length <= 1) setHasNext(false);
        mutate([...ads || [], ...nextAds], { revalidate: false });
    }, [lastAdId]);

    if (!ads) return <Spinner display="flex" justifyContent="center" />;
    return (
        <div>
            <Box>
                {ads.map((ad) => (
                    <MyAdsListItem {...ad} key={ad.id} />
                ))}
            </Box>

            {
                ads.length === 0
                    ? (
                        <Text my={4} textAlign="center">
                            You have not created  any ads yet.
                        </Text>
                    )
                    : null
            }
            {
                hasNext
                    ? (
                        <Flex justifyContent="center" mt={8}>
                            <Button variant="outline" onClick={handleFetchMore}>
                                Show More
                            </Button>
                        </Flex>
                    )
                    : null
            }
        </div>
    );
};

export default MyAdsList;
