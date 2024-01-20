import type { IconButtonProps, IconProps } from '@chakra-ui/react';


export interface FavoriteButtonProps extends Partial<IconButtonProps> {
    inFavorites?: boolean
    adId: number
    iconProps?: IconProps
}
