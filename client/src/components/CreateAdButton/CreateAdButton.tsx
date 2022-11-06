import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { CreateAdButtonProps } from './CreateAdButton.types';
import { useCreateAdButton } from './CreateAdButton.use';

import Protected from '~/components/Protected';


const CreateAdButton: FC<CreateAdButtonProps> = (props) => {
    const { loading, handleCreateNewAd } = useCreateAdButton(props);

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
