import { Button, Flex, Heading, Box } from '@chakra-ui/react';
import { FC } from 'react';

import { useUpdateCredentials } from './UpdateCredentials.use';

import InputField from '~/components/InputField';


const UpdateCredentials: FC = () => {
    const { formik } = useUpdateCredentials();

    return (
        <Box>
            <Heading pb={4} textAlign="center" textTransform="uppercase">
                Credentials
            </Heading>
            <form onSubmit={formik.handleSubmit}>
                <InputField
                    autoComplete="email"
                    formik={formik}
                    label="E-mail"
                    name="email"
                    placeholder="Enter your e-mail..."
                />
                <InputField
                    autoComplete="name"
                    formik={formik}
                    label="Name"
                    name="name"
                    placeholder="Enter username..."
                />
                <InputField
                    autoComplete="name"
                    formik={formik}
                    isRequired={false}
                    label="Phone number"
                    name="tel"
                    placeholder="Enter phone number..."
                />
                <InputField
                    autoComplete="name"
                    formik={formik}
                    isRequired={false}
                    label="Telegram"
                    name="telegram"
                    placeholder="Enter telegram..."
                />
                <InputField
                    autoComplete="name"
                    formik={formik}
                    isRequired={false}
                    label="WhatsApp"
                    name="whatsapp"
                    placeholder="Enter whatsapp..."
                />
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
        </Box>
    );
};

export default UpdateCredentials;
