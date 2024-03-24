import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { CreateAdButtonProps } from './CreateAdButton.types';
import { useCreateAdButton } from './CreateAdButton.use';


const CreateAdButton: FC<CreateAdButtonProps> = (props) => {
    const { loading, handleCreateNewAd } = useCreateAdButton(props);

    return (
        <Button
            isLoading={loading}
            loadingText="creating"
            textTransform="uppercase"
            variant="outline"
            onClick={handleCreateNewAd}
        >
            create new ad
        </Button>
    );
};

export default CreateAdButton;
