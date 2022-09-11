import { Text } from '@chakra-ui/react';
import { FC } from 'react';

import { PetAgeProps } from './PetAge.types';


const PetAge: FC<PetAgeProps> = ({ birthday, ...props }) => {
    const yearsOld = new Date().getFullYear() - new Date(birthday).getFullYear();
    const monthOld = new Date().getMonth() - new Date(birthday).getMonth();

    return (
        <Text as="span" {...props}>
            {yearsOld} years and {monthOld} month old
        </Text>
    );
};

export default PetAge;

