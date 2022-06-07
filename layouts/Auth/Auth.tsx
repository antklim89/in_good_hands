import {
    Center, Heading, Container, Input, FormControl, FormLabel, Text,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import zod, { ZodError } from 'zod';

import { AuthProps } from './Auth.types';


const authSchema = zod.object({
    name: zod.string()
        .max(50)
        .min(2),
});

type AuthType = zod.infer<typeof authSchema>
type AuthErrorsType = {
    [P in keyof AuthType]: string | null;
};

const Auth: FC<AuthProps> = ({ type = 'login' }) => {
    const [input, setInput] = useState<AuthType>({ name: '' });
    const [inputError, setInputError] = useState<AuthErrorsType>({ name: null });

    const handleChangeInput = (name: string, value: string) => {
        try {
            authSchema.pick({ [name]: true }).parse({ [name]: value });
            setInputError((prevError) => ({
                ...prevError,
                [name]: null,
            }));
        } catch (error) {
            if (error instanceof ZodError) {
                setInputError((prevError) => ({
                    ...prevError,
                    [name]: (error as ZodError).issues[0].message,
                }));
            }
        }

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
                    <FormControl isRequired isInvalid={Boolean(inputError.name)}>
                        <FormLabel>Username</FormLabel>
                        <Input
                            colorScheme="primary"
                            placeholder="Enter your username..."
                            value={input.name}
                            onChange={(e) => handleChangeInput('name', e.target.value)}
                        />
                        <Text color="gray.700" size="sm" textAlign="end">&nbsp;{inputError.name}</Text>
                    </FormControl>
                </form>
            </Container>
        </Center>
    );
};

export default Auth;

