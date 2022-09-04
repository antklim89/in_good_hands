import { ReactNode } from 'react';


export interface ConfirmDialogProps {
    renderButton: (onToggle: () => void) => ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => Promise<void>;
}
