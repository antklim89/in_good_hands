import { Button, Flex, Heading, useToast, Box } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { FC } from 'react';

import InputField from '~/components/InputField';
import { api, useAuthContext } from '~/utils';


const ProfileCredentials: FC = () => {
    const { user } = useAuthContext();
    const toast = useToast();

    const formik = useFormik({
        initialValues: { name: user?.name || '', email: user?.email || '' },
        async onSubmit(data) {
            try {
                await api().auth.update(data);
                toast({ title: 'Credentials successfully updated.', status: 'error' });
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
    });


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

export default ProfileCredentials;
