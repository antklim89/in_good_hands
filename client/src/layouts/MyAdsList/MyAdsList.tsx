import {
    Box,
    Button, Flex, Spinner,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';
import useSWR from 'swr';

import MyAdsListItem from './MyAdsList.Item';

import { api } from '~/utils';


const MyAdsList: FC = () => {
    const [hasNext, setHasNext] = useState(true);
    const { data = [], mutate } = useSWR('my-ads', () => api().ad.myAds().then((d) => d.data));

    const lastAdId = data?.slice?.().pop()?.id;

    const handleFetchMore = useCallback(async () => {
        const nextAds = await api().ad.myAds({ cursor: lastAdId }).then((d) => d.data);
        if (nextAds.length <= 1) setHasNext(false);
        mutate([...data || [], ...nextAds], { revalidate: false });
    }, [lastAdId]);

    if (!data) return <Spinner display="flex" justifyContent="center" />;
    return (
        <div>
            <Box>
                {data.map((ad) => (
                    <MyAdsListItem {...ad} key={ad.id} />
                ))}
            </Box>

            {hasNext
                ? (
                    <Flex justifyContent="center" mt={8}>
                        <Button variant="outline" onClick={handleFetchMore}>
                            Show More
                        </Button>
                    </Flex>
                )
                : null}
        </div>
    );
};

export default MyAdsList;
