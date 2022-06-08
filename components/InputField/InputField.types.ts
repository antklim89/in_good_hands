import { InputProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';


export type Values = Record<string, string>;

interface FormikType<T extends Values> {
     values: T;
     errors: { [P in keyof T]?: string | string[] | null };
     handleChange: (e: ChangeEvent<HTMLElement>) => void;
     isValid: boolean;
     dirty: boolean;
     isSubmitting: boolean;
     isValidating: boolean;
}

export interface InputFieldProps<T extends Values> extends Omit<InputProps, 'name'> {
     formik: FormikType<T>;
     name: keyof T;
     label?: string;
}

export type InputFieldFC = <T extends Values>(props: InputFieldProps<T>) => JSX.Element;
