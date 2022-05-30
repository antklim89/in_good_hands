import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useMediaQuery, useDisclosure,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { FC, useRef } from 'react';

import HeaderLinks from './HeaderLinks';


const HeaderDrawer: FC = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const { breakpoints } = useTheme() as {breakpoints: {md: string}};
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    if (isLargerThen) return (
        <HeaderLinks />
    );
    return (
        <>
            <Button
                color="black"
                ref={btnRef}
                variant="link"
                onClick={onToggle}
            >
                <HamburgerIcon />
            </Button>
            <Drawer
                finalFocusRef={btnRef}
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay onClick={onClose} />
                <DrawerContent>
                    <DrawerBody sx={{ 'a': { color: 'primary.text' } }}>

                        <HeaderLinks onClose={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default HeaderDrawer;
