/* eslint-disable no-undefined */
import { Text } from '@chakra-ui/react';
import { FC } from 'react';

import { PriceProps } from './Price.types';


const numberFormater = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });

const Price: FC<PriceProps> = ({ price, ...props }) => {
    return (
        <Text as="span" {...props}>
            {numberFormater.format(Number(price))}
        </Text>
    );
};

export default Price;

