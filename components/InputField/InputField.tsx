import { FormControl, FormLabel, Text, Input, Flex } from '@chakra-ui/react';

import { InputFieldFC } from './InputField.types';


const InputField: InputFieldFC = ({ formik, label, name, ...props }) => {
    const error = formik.errors[name];

    return (
        <FormControl isRequired isDisabled={formik.isSubmitting} mb={2}>
            {(label) ? <FormLabel>{label}</FormLabel> : null}
            <Input
                {...props}
                name={String(name)}
                value={formik.values[name]}
                onChange={formik.handleChange}
            />
            <Flex justifyContent="flex-end">
                <Text
                    as="span"
                    color="gray.500"
                    fontSize="xs"
                >
                    &nbsp;{Array.isArray(error) ? error[0] : error}
                </Text>
            </Flex>
        </FormControl>
    );
};

export default InputField;

