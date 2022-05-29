import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';


const HeaderAuth: FC = () => {
    return (
        <nav>
            <Box as="ul" display="flex" listStyleType="none">
                <Box as="li" >
                    <Link passHref href="/login">
                        <Button as="a" variant="ghost" >
                            Log In
                        </Button>
                    </Link>
                </Box>
                <Box as="li" >
                    <Link passHref href="/login">
                        <Button as="a" variant="ghost" >
                            Register
                        </Button>
                    </Link>
                </Box>
            </Box>
        </nav>
    );
};

export default HeaderAuth;
