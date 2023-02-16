import { IconButtonProps } from '@chakra-ui/react';


export interface AdMenuProps extends Omit<IconButtonProps, 'aria-label'> {
    adId: number
    ownerId: string
}
