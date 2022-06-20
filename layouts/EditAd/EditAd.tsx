import { Center, Container, Heading, Flex, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC } from 'react';
import { ZodError } from 'zod';

import InputField from '~/components/InputField';

import { adEditSchema } from './EditAd.schema';
import { CreateAdProps } from './EditAd.types';


const EditAd: FC<CreateAdProps> = ({ type = 'create' }) => {

    const formik = useFormik({
        initialValues: {
            body: '',
            type: '',
            breed: '',
            name: '',
            price: '0',
            tel: '',
            email: '',
            birthday: new Date().toISOString().split('T')[0],
        },
        async onSubmit(val) {
            // try {
            //         const user = await login(val);
            //         toast({ title: 'You have successfully logged in!', status: 'success' });
            // } catch (error) {
            //     if (error instanceof Error) toast({ title: error.message, status: 'error' });
            // }
        },
        async validate(val) {
            try {
                await adEditSchema.parseAsync(val);
            } catch (error) {
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
            return {};
        },
    });

    return (
        <Center height="100%">
            <Container
                as="section"
                border="1px solid rgba(0,0,0,0.2)"
                boxShadow="md"
                maxWidth="container.sm"
                my={8}
                p={[1, 4, 10]}
            >
                <Heading pb={4} textAlign="center" textTransform="uppercase">
                    {type}
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    <InputField
                        formik={formik}
                        label="Body"
                        name="body"
                    />
                    <InputField
                        formik={formik}
                        label="Pet Type"
                        name="type"
                    />
                    <InputField
                        formik={formik}
                        label="Breed"
                        name="breed"
                    />
                    <InputField
                        autoComplete="name"
                        formik={formik}
                        label="Pet name"
                        name="name"
                    />
                    <InputField
                        formik={formik}
                        label="Price"
                        name="price"
                        type="number"
                    />
                    <InputField
                        autoComplete="email"
                        formik={formik}
                        label="E-mail"
                        name="email"
                        type="email"
                    />
                    <InputField
                        formik={formik}
                        label="Pone number"
                        name="tel"
                        type="tel"
                    />
                    <InputField
                        formik={formik}
                        label="Pet birthday"
                        name="birthday"
                        type="date"
                    />
                    <Flex justify="flex-end" mt={16}>
                        <Button
                            disabled={!formik.isValid}
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Confirm
                        </Button>
                    </Flex>
                </form>
            </Container>
        </Center>
    );
};

export default EditAd;

