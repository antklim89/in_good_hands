import { InputProps, SelectProps, TextareaProps } from '@chakra-ui/react';
import { ChangeEvent, ReactNode } from 'react';


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

export interface InputFieldProps<T extends Values>{
     formik: FormikType<T>;
     name: keyof T;
     label?: string;
     children?: ReactNode
}


export interface InputFieldBaseFC {
     <T extends Values>(props: InputFieldProps<T> & {as?: 'input'} & Omit<InputProps, 'name'| 'as'>): JSX.Element
     <T extends Values>(props: InputFieldProps<T> & {as: 'select'} & Omit<SelectProps, 'name'| 'as'>): JSX.Element
     <T extends Values>(props: InputFieldProps<T> & {as: 'textarea'} & Omit<TextareaProps, 'name'| 'as'>): JSX.Element
}
