import { Flex, Button } from '@chakra-ui/react';
import { FC } from 'react';

import { useAuthFormik } from './Auth.formik';
import { AuthFormProps } from './Auth.types';

import InputField from '~/components/InputField';


const AuthForm: FC<AuthFormProps> = ({ type, onClose }) => {
    const formik = useAuthFormik({ type, onClose });

    return (
        <form onSubmit={formik.handleSubmit}>
            {type === 'register' && (
                <InputField
                    autoComplete="name"
                    formik={formik}
                    label="Name"
                    name="name"
                    placeholder="Enter your username..."
                />
            )}
            <InputField
                autoComplete="email"
                formik={formik}
                label="E-mail"
                name="email"
                placeholder="Enter your e-mail..."
            />
            <InputField
                autoComplete="new-password"
                formik={formik}
                label="Password"
                name="password"
                placeholder="Enter your password..."
                type="password"
            />
            {type === 'register' && (
                <InputField
                    autoComplete="new-password"
                    formik={formik}
                    label="Confirm password"
                    name="confirm"
                    placeholder="Confirm your password..."
                    type="password"
                />
            )}
            <Flex justify="flex-end">
                <Button
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                >
                    Close
                </Button>
                <Button
                    disabled={!formik.isValid}
                    isLoading={formik.isSubmitting}
                    type="submit"
                >
                    Confirm
                </Button>
            </Flex>
        </form>
    );
};

export default AuthForm;
