import {
    useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
} from '@chakra-ui/react';
import { FC } from 'react';

import { AuthProps } from './Auth.types';
import AuthForm from './AuthForm';


const Auth: FC<AuthProps> = ({ type = 'login', children }) => {
    const { onOpen, isOpen, onClose } = useDisclosure();

    return (
        <>
            {children({ onOpen })}
            <Modal
                isCentered
                isOpen={isOpen} size="2xl"
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent px={4} py={8}>
                    <ModalHeader textTransform="capitalize">
                        {type}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AuthForm type={type} onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    );
};

export default Auth;

