import { Button, Flex, Heading, useToast, Box } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC, useEffect } from 'react';

import { UpdateCredentialsSchema } from './UpdateCredentials.schema';

import InputField from '~/components/InputField';
import { api, useAuthContext } from '~/utils';


const UpdateCredentials: FC = () => {
    const { user } = useAuthContext();
    const toast = useToast();

    const formik = useFormik<UpdateCredentialsSchema>({
        initialValues: {
            name: user?.name || '',
            email: user?.email || '',
            tel: '',
            telegram: '',
            whatsapp: '',
        },
        async onSubmit(data) {
            const filtredData = Object.entries(data).reduce((acc, [key, value]) => {
                if (typeof value === 'string' && value.length > 0) acc[key as keyof typeof data] = value;
                return acc;
            }, {} as Partial<UpdateCredentialsSchema>);

            try {
                await api().auth.update(filtredData);
                toast({ title: 'Credentials successfully updated.', status: 'error' });
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
    });

    useEffect(() => {
        api().auth.me().then(({ data }) => {
            formik.setValues({
                name: data?.name || '',
                email: data?.email || '',
                tel: data?.tel || '',
                telegram: data?.telegram || '',
                whatsapp: data?.whatsapp || '',
            });
        });
    }, []);


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
