import { Input, InputGroup, InputRightElement, InputGroupProps } from '@chakra-ui/react';
import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';

import { usePetSearch } from './PetSearch.use';


const PetSearch: FC<InputGroupProps> = (props) => {
    const { handleChange, value, handleClear } = usePetSearch();

    return (
        <InputGroup {...props}>
            {value.length > 0 && (
                <InputRightElement
                    as="button"
                    type="button"
                    onClick={handleClear}
                >
                    <FaTimes />
                </InputRightElement>
            )}
            <Input
                placeholder="Enter search query..."
                value={value}
                onChange={handleChange}
            />
        </InputGroup>
    );
};

export default PetSearch;
