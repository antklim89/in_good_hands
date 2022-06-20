import {
    FormControl, FormLabel, Text, Flex, Input, InputProps, Select, SelectProps, Textarea, TextareaProps,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { InputFieldBaseFC } from './InputField.types';


const InputField: InputFieldBaseFC = ({ formik, label, name, as, ...props }) => {
    const error = formik.errors[name];

    const component = useMemo(() => {
        switch (as) {
        case 'select':
            return (
                <Select
                    {...props as SelectProps}
                    name={String(name)}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                />
            );
        case 'textarea':
            return (
                <Textarea
                    {...props as TextareaProps}
                    name={String(name)}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                />
            );
        case 'input':
        default:
            return (
                <Input
                    {...props as InputProps}
                    name={String(name)}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                />
            );
        }
    }, [as]);

    return (
        <FormControl isRequired isDisabled={formik.isSubmitting} mb={2}>
            {(label) ? <FormLabel>{label}</FormLabel> : null}
            {component}
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

