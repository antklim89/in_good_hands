import {
    Center, Heading, Container, Button, Flex, useToast,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ZodError } from 'zod';

import InputField from '~/components/InputField';
import { useAuthContext, login, register } from '~/utils';

import { authSchema } from './Auth.schema';
import { AuthProps, AuthType } from './Auth.types';


const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const { setCredentials } = useAuthContext();
    const toast = useToast();
    const { back } = useRouter();

    const formik = useFormik<AuthType>({
        initialValues: { username: '', email: '', password: '', confirm: '' },
        async onSubmit(val) {
            try {
                if (type === 'login') {
                    const user = await login(val);
                    setCredentials(user);
                    toast({ title: 'You have successfully logged in!', status: 'success' });
                    back();
                } else {
                    const user = await register(val);
                    setCredentials(user);
                    toast({ title: 'You have successfully registred!', status: 'success' });
                    back();
                }
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
        async validate(val) {
            try {
                if (type === 'login') {
                    await authSchema.pick({ email: true, password: true }).parseAsync(val);
                } else {
                    await authSchema.pick({ email: true, password: true, username: true }).parseAsync(val);
                    if (val.confirm !== val.password) return { confirm: 'Passwords do not match.' };
                }
            } catch (error) {
                if (error instanceof ZodError) {
                    return error.formErrors.fieldErrors;
                }
            }
            return {};
        },
    });


    return (
        <Center height="100%">
            <Container
                as="section"
                border="1px solid rgba(0,0,0,0.2)"
                boxShadow="md"
                maxWidth="container.sm"
                p={[1, 4, 10]}
            >
                <Heading pb={4} textAlign="center" textTransform="uppercase">
                    {type}
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    {type === 'register' && (
                        <InputField
                            autoComplete="name"
                            formik={formik}
                            label="Username"
                            name="username"
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
                            type="submit"
                        >
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Container>
        </Center>
    );
};

export default Auth;

