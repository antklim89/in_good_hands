import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Button, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useMediaQuery, useDisclosure,
    DrawerCloseButton, Theme,
} from '@chakra-ui/react';
import { useTheme } from '@emotion/react';
import { FC, useRef } from 'react';

import HeaderLinks from './Header.Links';


const HeaderDrawer: FC = () => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const { breakpoints } = useTheme() as Theme;
    const [isLargerThen] = useMediaQuery(`(min-width: ${breakpoints.md})`);

    if (isLargerThen) return <HeaderLinks />;

    return (
        <>
            <Button
                color="black"
                ref={btnRef}
                variant="link"
                onClick={onToggle}
            >
                <HamburgerIcon color="primary.textLight" />
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
                        sx={{ 'a': { color: 'primary.textLight' } }}
                    >
                        <DrawerCloseButton color="primary.textLight" />
                        <HeaderLinks flexDirection="column" onClose={onClose} />
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default HeaderDrawer;
