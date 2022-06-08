import { FormControl, FormLabel, Text, Input } from '@chakra-ui/react';

import { InputFieldFC } from './InputField.types';


const InputField: InputFieldFC = ({ formik, label, name, ...props }) => {
    const error = formik.errors[name];

    return (
        <FormControl isRequired isInvalid={Boolean(error)}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Input
                {...props}
                colorScheme="primary"
                name={String(name)}
                value={formik.values[name]}
                onChange={formik.handleChange}
            />
            <Text color="gray.700" size="sm" textAlign="end">
                &nbsp;{Array.isArray(error) ? error[0] : error}
            </Text>
        </FormControl>
    );
};

export default InputField;

