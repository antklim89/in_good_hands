import { StarIcon } from '@chakra-ui/icons';
import { Button, Tooltip } from '@chakra-ui/react';
import { FC } from 'react';

import { FavoriteButtonProps } from './FavoriteButton.types';
import { useFavoriteButton } from './FavoriteButton.use';


const FavoriteButton: FC<FavoriteButtonProps> = ({ iconProps, adId, inFavorites: initInFavorites, ...props }) => {
    const { handleToggleFavorites, inFavorites } = useFavoriteButton({ adId, inFavorites: initInFavorites });

    return (
        <Tooltip label={inFavorites ? 'Remove from favorites' : 'Add to favorites'}>
            <Button
                alignSelf="center"
                aria-label={inFavorites ? 'remove from favorites' : 'add to favorites'}
                p={4}
                size="xl"
                variant="ghost"
                onClick={handleToggleFavorites}
                {...props}
            >
                <StarIcon
                    color={inFavorites ? 'primary.500' : 'transparent'}
                    fontSize="4xl"
                    stroke="primary.500"
                    {...iconProps}
                />
            </Button>
        </Tooltip>
    );
};

export default FavoriteButton;

