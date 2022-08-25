import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useMediaQuery, useDisclosure,
    DrawerCloseButton, Divider,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { FC, useRef } from 'react';

import HeaderAuth from './HeaderAuth';
import HeaderLinks from './HeaderLinks';


const HeaderDrawer: FC = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const { breakpoints } = useTheme() as {breakpoints: {md: string}};
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    if (isLargerThen) return (
        <>
            <HeaderLinks />
            <HeaderAuth />
        </>
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
                    <DrawerBody
                        bg="primary.600"
                        pt={12}
                        sx={{ 'a': { color: 'primary.text' } }}
                    >
                        <DrawerCloseButton />
                        <HeaderLinks flexDirection="column" onClose={onClose} />
                        <Divider bg="primary.text" my={4} />
                        <HeaderAuth />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default HeaderDrawer;
