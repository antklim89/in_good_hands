import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';

import { CreateAdButtonProps } from './CreateAdButton.types';

import Protected from '~/components/Protected';
import { api } from '~/utils';


const CreateAdButton: FC<CreateAdButtonProps> = ({ onCreate }) => {
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleCreateNewAd = useCallback(async () => {
        setLoading(true);
        try {
            const { data: ad } = await api().ad.createNew();
            onCreate?.();
            await push(`/ads/update/${ad.id}`);
        } catch (error) {
            toast({ title: 'While creating a new ad, an error occurred. Try again later.', status: 'error' });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <Protected protectedComponent="">
            <Button
                as="a"
                color="primary.textLight"
                isLoading={loading}
                loadingText="creating"
                textTransform="uppercase"
                variant="ghost"
                onClick={handleCreateNewAd}
            >
                create ad
            </Button>
        </Protected>
    );
};

export default CreateAdButton;
