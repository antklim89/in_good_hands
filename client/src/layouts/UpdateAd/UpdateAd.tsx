import {
    Center, Container, Flex, Button, useToast, FormControl, FormLabel, Switch,
} from '@chakra-ui/react';
import { adInputSchema } from '@in-good-hands/server/src/schemas/ad.schema';
import { useFormik } from 'formik';
import { FC } from 'react';
import { ZodError } from 'zod';

import { UpdateAdSchema, updateAdSchema } from './UpdateAd.schema';
import { UpdateAdProps } from './UpdateAd.types';
import UpdateAdImages from './UpdateAdImages';

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
            telegram: ad.telegram || '',
            whatsapp: ad.whatsapp || '',
            birthday: new Date(ad.birthday || '').toISOString().split('T')[0],
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
                <form onSubmit={formik.handleSubmit}>
                    <FormControl
                        alignItems="center"
                        display="flex"
                        justifyContent="space-between"
                        mb={8}
                    >
                        <FormLabel htmlFor="is-ad-published" mb="0">
                            Published
                        </FormLabel>
                        <Switch
                            checked={formik.values.isPublished}
                            id="is-ad-published"
                            name="isPublished"
                            size="lg"
                            onChange={formik.handleChange}
                        />
                    </FormControl>
                    <InputField
                        as="textarea"
                        formik={formik}
                        label="Body"
                        name="description"
                        resize="none"
                    />
                    <UpdateAdImages ad={ad} />
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
                    <InputField
                        formik={formik}
                        isRequired={false}
                        label="Telegram"
                        name="telegram"
                    />
                    <InputField
                        formik={formik}
                        isRequired={false}
                        label="WhatsApp"
                        name="whatsapp"
                    />
                    <InputField
                        formik={formik}
                        label="Pet birthday"
                        max="2023-06-30T16:30"
                        min="2017-06-01T08:30"
                        name="birthday"
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        type="date"
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

