import {
    Center, Container, Flex, Button, FormControl, FormLabel, Switch,
} from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/share/constants';
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
                        isRequired
                        as="textarea"
                        formik={formik}
                        label="Body"
                        name="description"
                        resize="none"
                    />
                    <UpdateAdImages ad={ad} />
                    <InputField
                        isRequired
                        as="select"
                        formik={formik}
                        label="Pet Type"
                        name="type"
                    >
                        {animalsTypes.map((itemType) => (
                            <option key={itemType} value={itemType}>{itemType}</option>
                        ))}
                    </InputField>
                    <InputField
                        isRequired
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
                        isRequired
                        formik={formik}
                        label="Price"
                        name="price"
                        type="number"
                    />
                    <InputField
                        isRequired
                        autoComplete="email"
                        formik={formik}
                        label="E-mail"
                        name="email"
                        type="email"
                    />
                    <InputField
                        isRequired
                        formik={formik}
                        label="Pone number"
                        name="tel"
                        type="tel"
                    />
                    <InputField
                        formik={formik}
                        label="Telegram"
                        name="telegram"
                    />
                    <InputField
                        formik={formik}
                        label="WhatsApp"
                        name="whatsapp"
                    />
                    <InputField
                        isRequired
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

