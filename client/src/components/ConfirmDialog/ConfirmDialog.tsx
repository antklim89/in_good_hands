import {
    Button,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverTrigger,
    useDisclosure,
} from '@chakra-ui/react';
import { FC, useCallback } from 'react';

import { ConfirmDialogProps } from './ConfirmDialog.types';


const ConfirmDialog: FC<ConfirmDialogProps> = ({ renderButton, confirmText = 'confirm', cancelText = 'cancel', onConfirm }) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const handleConfirm = useCallback(async () => {
        await onConfirm();
        onToggle();
    }, [onConfirm]);

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                {renderButton(onToggle)}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>Are you sure you want<br />to delete this ad?</PopoverBody>
                <PopoverFooter
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button
                        colorScheme="red"
                        size="sm"
                        textTransform="uppercase"
                        onClick={onToggle}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        colorScheme="green"
                        size="sm"
                        textTransform="uppercase"
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
};

export default ConfirmDialog;
