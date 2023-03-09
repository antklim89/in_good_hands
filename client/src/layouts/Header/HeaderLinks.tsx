import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Theme, useMediaQuery, useTheme } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { HeaderLinksProps } from './Header.types';

import CreateAdButton from '~/components/CreateAdButton';


const HeaderLinks: FC<HeaderLinksProps> = ({ onClose, ...props }) => {
    const { breakpoints } = useTheme<Theme>();
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.sm})`);

    return (
        <nav>
            <Box
                as="ul"
                display="flex"
                listStyleType="none"
                {...props}
            >
                <li>
                    <Button
                        _hover={{ color: 'primary.600', bg: 'primary.50' }}
                        as={Link}
                        color="white"
                        href="/about"
                        textTransform="uppercase"
                        variant="ghost"
                        onClick={onClose}
                    >
                        {isLargerThen ? 'about' : <InfoIcon />}
                    </Button>
                </li>
                <li>
                    <CreateAdButton onCreate={onClose} />
                </li>
            </Box>
        </nav>
    );
};

export default HeaderLinks;
