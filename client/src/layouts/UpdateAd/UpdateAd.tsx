import {
    Center, Container, Heading, Flex, Button, useToast,
} from '@chakra-ui/react';
import { adInputSchema } from '@in-good-hands/server/src/schemas/ad.schema';
import { useFormik } from 'formik';
import { FC } from 'react';
import { ZodError } from 'zod';

import { UpdateAdSchema, updateAdSchema } from './UpdateAd.schema';
import { UpdateAdProps } from './UpdateAd.types';

import InputField from '~/components/InputField';
import { api } from '~/utils';


const UpdateAd: FC<UpdateAdProps> = ({ ad }) => {
    const toast = useToast();

    const formik = useFormik<UpdateAdSchema>({
        initialValues: {
            breed: ad.breed || '',
            description: ad.description || '',
            email: ad.email || '',
            name: ad.name || '',
            price: ad.price || 0,
            tel: ad.tel || '',
            type: ad.type || 'cat',
            isPublished: ad.isPublished || false,
        },
        async onSubmit(data) {
            try {
                await api().ad.update({ id: ad.id }, data);
                toast({ title: 'Ad updated successfully!', status: 'success' });
            } catch (error) {
                if (error instanceof Error) toast({ title: error.message, status: 'error' });
            }
        },
        async validate(data) {
            try {
                await updateAdSchema.parseAsync(data);
            } catch (error) {
                if (error instanceof ZodError) return error.formErrors.fieldErrors;
            }
            return {};
        },
        validateOnMount: true,
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
                    {ad ? 'Update ad' : 'Create ad'}
                </Heading>
                <form onSubmit={formik.handleSubmit}>
                    <InputField
                        as="textarea"
                        formik={formik}
                        label="Body"
                        name="description"
                        resize="none"
                    />
                    {/* <UpdateAdImages id={id} images={images} /> */}
                    <InputField
                        as="select"
                        formik={formik}
                        label="Pet Type"
                        name="type"
                    >
                        {adInputSchema.properties.type.enum.map((itemType) => (
                            <option key={itemType} value={itemType}>{itemType}</option>
                        ))}
                    </InputField>
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
                    {/* <InputField
                        formik={formik}
                        label="Pet birthday"
                        name="birthday"
                        type="date"
                    /> */}
                    <InputField
                        as="switch"
                        formik={formik}
                        isRequired={false}
                        label="Published"
                        name="isPublished"
                        size="lg"
                    />
                    <Flex justify="flex-end" mt={16}>
                        <Button
                            disabled={!formik.isValid}
                            isLoading={formik.isSubmitting}
                            type="submit"
                        >
                            Save
                        </Button>
                    </Flex>
                </form>
            </Container>
        </Center>
    );
};

export default UpdateAd;

