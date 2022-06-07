import { FormControl, FormLabel, Text, Input } from '@chakra-ui/react';
import { FC } from 'react';

import { InputFieldProps } from './InputField.types';


const InputField: FC<InputFieldProps> = ({ error, label, ...props }) => {

    return (
        <FormControl isRequired isInvalid={Boolean(error)}>
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Input {...props} colorScheme="primary" />
            <Text color="gray.700" size="sm" textAlign="end">&nbsp;{error}</Text>
        </FormControl>
    );
};

export default InputField;

