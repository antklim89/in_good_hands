import { Heading, Box, Button } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { AuthProps } from './Auth.types';
import AuthForm from './AuthForm';


const Auth: FC<AuthProps> = ({ type: initType = 'login', onClose }) => {
    const [type, setType] = useState<AuthProps['type']>(initType);

    const oppositeType: AuthProps['type'] = type === 'login' ? 'register' : 'login';

    return (
        <Box>
            <Heading textTransform="capitalize">
                {type}
            </Heading>
            <Button variant="link" onClick={() => setType(oppositeType)} >
                or {oppositeType}
            </Button>
            <AuthForm type={type} onClose={onClose} />
        </Box>
    );
};

export default Auth;

