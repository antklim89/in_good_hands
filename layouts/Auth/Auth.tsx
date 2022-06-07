import { Center, Heading, Container, Button, Flex } from '@chakra-ui/react';
import { FC, useEffect, useMemo, useState } from 'react';
import { ZodError } from 'zod';

import InputField from '~/components/InputField';
import { login, register } from '~/utils/server';

import { authSchema } from './Auth.schema';
import { AuthErrorsType, AuthProps, AuthType } from './Auth.types';


const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const [input, setInput] = useState<AuthType>({ username: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [inputError, setInputError] = useState<AuthErrorsType>({});

    useEffect(() => {
        authSchema.parseAsync(input)
            .then(() => setInputError({}))
            .catch((error) => {
                if (error instanceof ZodError) {
                    setInputError((error as ZodError).formErrors.fieldErrors);
                }
            });

        if (input.password === confirmPassword) {
            setConfirmPasswordError(null);
        } else {
            setConfirmPasswordError('Passwords do not match.');
        }
    }, [...Object.values(input), confirmPassword]);

    const handleChangeInput = (name: keyof AuthType, value: string) => {
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    // const isValid = useMemo(() => {
    //     return Object.values({ ...inputError, confirmPasswordError })
    //         .every((i) => i);
    // }, [Object.values({ ...inputError, confirmPasswordError }).join()]);

    const handleAuth = () => {
        if (type === 'login') {
            login(input);
        } else {
            register(input);
        }
    };

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
                <form>
                    {type === 'register' && (
                        <InputField
                            autoComplete="name"
                            error={inputError.username}
                            label="Username"
                            placeholder="Enter your username..."
                            value={input.username}
                            onChange={(e) => handleChangeInput('username', e.target.value)}
                        />
                    )}
                    <InputField
                        autoComplete="email"
                        error={inputError.email}
                        label="E-mail"
                        placeholder="Enter your e-mail..."
                        value={input.email}
                        onChange={(e) => handleChangeInput('email', e.target.value)}
                    />
                    <InputField
                        autoComplete="new-password"
                        error={inputError.password}
                        label="Password"
                        placeholder="Enter your password..."
                        type="password"
                        value={input.password}
                        onChange={(e) => handleChangeInput('password', e.target.value)}
                    />
                    {type === 'register' && (
                        <InputField
                            autoComplete="new-password"
                            error={confirmPasswordError}
                            label="Confirm password"
                            placeholder="Confirm your password..."
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <Flex justify="flex-end">
                        <Button colorScheme="primary" onClick={() => handleAuth()}>
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Container>
        </Center>
    );
};

export default Auth;

