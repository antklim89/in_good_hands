import {
    Center, Container, Flex, Button, FormControl, FormLabel, Switch,
} from '@chakra-ui/react';
import { adInputSchema } from '@in-good-hands/server/src/schemas/adSchemas';
import { FC } from 'react';

import { useUpdateAdFormik } from './UpdateAd.formik';
import { UpdateAdProps } from './UpdateAd.types';
import UpdateAdImages from './UpdateAdImages';

import InputField from '~/components/InputField';


const UpdateAd: FC<UpdateAdProps> = ({ ad }) => {
    const formik = useUpdateAdFormik({ ad });

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
                            id="is-ad-published"
                            isChecked={formik.values.isPublished}
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

