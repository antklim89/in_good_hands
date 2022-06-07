import { Center, Heading, Container } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { ZodError } from 'zod';

import InputField from '~/components/InputField';

import { authSchema } from './Auth.schema';
import { AuthErrorsType, AuthProps, AuthType } from './Auth.types';


const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const [input, setInput] = useState<AuthType>({ name: '', password: '' });
    const [inputError, setInputError] = useState<AuthErrorsType>({});

    useEffect(() => {
        authSchema.parseAsync(input)
            .then(() => setInputError({}))
            .catch((error) => {
                if (error instanceof ZodError) {
                    setInputError((error as ZodError).formErrors.fieldErrors);
                }
            });
    }, Object.values(input));

    const handleChangeInput = (name: string, value: string) => {
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
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
                    <InputField
                        error={inputError.name}
                        label="Username"
                        placeholder="Enter your username..."
                        value={input.name}
                        onChange={(e) => handleChangeInput('name', e.target.value)}
                    />
                    <InputField
                        error={inputError.password}
                        label="Password"
                        placeholder="Enter your password..."
                        type="password"
                        value={input.password}
                        onChange={(e) => handleChangeInput('password', e.target.value)}
                    />
                    {type === 'register' && (
                        <InputField
                            error={inputError.name}
                            label="Confirm password"
                            placeholder="Confirm your password..."
                            type="password"
                            value={input.name}
                            onChange={(e) => handleChangeInput('name', e.target.value)}
                        />
                    )}
                </form>
            </Container>
        </Center>
    );
};

export default Auth;

