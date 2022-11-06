import { Input, InputProps } from '@chakra-ui/react';
import { FC } from 'react';

import { usePetSearch } from './PetSearch.use';


const PetSearch: FC<InputProps> = (props) => {
    const { router, handleChange } = usePetSearch();
    return (
        <Input
            defaultValue={router.query.search}
            {...props}
            placeholder="Enter search query..."
            onChange={handleChange}
        />
    );
};

export default PetSearch;
