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


const ConfirmDialog: FC<ConfirmDialogProps> = ({
    renderButton,
    confirmText = 'confirm',
    cancelText = 'cancel',
    message,
    onConfirm,
    isLoading = false,
}) => {
    const { isOpen, onToggle, onClose } = useDisclosure();

    const handleConfirm = useCallback(async () => {
        await onConfirm(onToggle);
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
                {message ? <PopoverBody>{message}</PopoverBody> : null}
                <PopoverFooter
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button
                        isLoading={isLoading}
                        size="sm"
                        textTransform="uppercase"
                        variant="ghost"
                        onClick={onToggle}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        isLoading={isLoading}
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
