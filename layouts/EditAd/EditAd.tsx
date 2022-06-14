import { Center, Container, Heading, Flex, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC } from 'react';

import InputField from '~/components/InputField';

import { CreateAdProps } from './EditAd.types';


const EditAd: FC<CreateAdProps> = ({ type = 'create' }) => {

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', confirm: '' },
        async onSubmit(val) {
            // try {
            //         const user = await login(val);
            //         toast({ title: 'You have successfully logged in!', status: 'success' });
            // } catch (error) {
            //     if (error instanceof Error) toast({ title: error.message, status: 'error' });
            // }
        },
        async validate(val) {
            // try {
            //         await authSchema.pick({ email: true, password: true, username: true }).parseAsync(val);
            // } catch (error) {
            //     if (error instanceof ZodError) return error.formErrors.fieldErrors;
            // }
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
                p={[1, 4, 10]}
            >
                <Heading pb={4} textAlign="center" textTransform="uppercase">
                    {type}
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    <InputField
                        autoComplete="email"
                        formik={formik}
                        label="E-mail"
                        name="email"
                        placeholder="Enter your e-mail..."
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
            </Container>
        </Center>
    );
};

export default EditAd;

