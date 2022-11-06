import { Center, Heading, Container, Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { AuthProps } from './Auth.types';
import { useAuth } from './Auth.use';

import InputField from '~/components/InputField';


const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const { formik } = useAuth({ type });

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

