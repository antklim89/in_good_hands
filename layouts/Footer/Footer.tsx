import { Box, Text, Container } from '@chakra-ui/react';
import { FC } from 'react';


const Footer: FC = () => {
    return (
        <Box as="footer" bg="cornflowerblue">
            <Container maxWidth="container.xl">
                <Text py={4}>&copy; {new Date().getFullYear()} In Good Hands</Text>
            </Container>
        </Box>
    );
};

export default Footer;

