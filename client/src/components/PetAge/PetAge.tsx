import { Text } from '@chakra-ui/react';
import { FC } from 'react';

import { PetAgeProps } from './PetAge.types';


const DAYS_IN_YEAR = 362.25;
const MILLISECONDS_IN_YEAR = DAYS_IN_YEAR * 24 * 60 * 60 * 1000;

const PetAge: FC<PetAgeProps> = ({ birthday, ...props }) => {
    const yearsOld = (new Date().getTime() - new Date(birthday).getTime()) / MILLISECONDS_IN_YEAR;
    const monthOld = (yearsOld - Math.floor(yearsOld)) * 12;

    if (yearsOld < 0 || (yearsOld < 1 && monthOld < 1)) return (
        <Text as="span" {...props}>
            Less than a month
        </Text>
    );
    if (yearsOld < 1 && monthOld > 1) return (
        <Text as="span" {...props}>
            {Math.floor(monthOld)} month old
        </Text>
    );
    if (yearsOld > 1 && monthOld < 1) return (
        <Text as="span" {...props}>
            {Math.floor(yearsOld)} years old
        </Text>
    );
    return (
        <Text as="span" {...props}>
            {Math.floor(yearsOld)} years and {Math.floor(monthOld)} month old
        </Text>
    );
};

export default PetAge;

