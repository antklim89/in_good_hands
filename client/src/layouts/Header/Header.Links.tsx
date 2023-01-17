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
                    <Link passHref href="/about">
                        <Button
                            as="a"
                            color="primary.textLight"
                            textTransform="uppercase"
                            variant="ghost"
                            onClick={onClose}
                        >
                            {isLargerThen ? 'about' : <InfoIcon />}
                        </Button>
                    </Link>
                </li>
                <li>
                    <CreateAdButton onCreate={onClose} />
                </li>
            </Box>
        </nav>
    );
};

export default HeaderLinks;
