import type { FlexboxProps, SystemProps } from '@chakra-ui/styled-system';


export interface HeaderLinksProps extends FlexboxProps, SystemProps {
    onClose?: () => void;
}

export interface HeaderAuthProps {
    onClose?: () => void;
}
