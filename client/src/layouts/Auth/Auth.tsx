import { Heading, Box, Button, Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AuthProps } from './Auth.types';
import AuthForm from './AuthForm';


const Auth: FC<AuthProps> = ({ type: initType = 'login', onClose }) => {
    const [type, setType] = useState<AuthProps['type']>(initType);

    const oppositeType: AuthProps['type'] = type === 'login' ? 'register' : 'login';

    return (
        <Box>
            <Flex flexDirection="column" justifyContent="center" mb={8}>
                <Heading textAlign="center" textTransform="capitalize">
                    {type}
                </Heading>
                <Button textAlign="center" variant="link" onClick={() => setType(oppositeType)} >
                    or {oppositeType}
                </Button>
            </Flex>
            <AuthForm type={type} onClose={onClose} />
        </Box>
    );
};

export default Auth;
