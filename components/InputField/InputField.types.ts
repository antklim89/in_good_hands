import { InputProps } from '@chakra-ui/react';


export interface InputFieldProps extends InputProps {
     error?: string | string[] | null,
     label?: string
}
