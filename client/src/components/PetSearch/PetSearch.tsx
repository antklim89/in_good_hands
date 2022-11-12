import { Input, InputGroup, InputRightElement, InputProps } from '@chakra-ui/react';
import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';

import { usePetSearch } from './PetSearch.use';


const PetSearch: FC<InputProps> = (props) => {
    const { handleChange, value, handleClear } = usePetSearch();

    return (
        <InputGroup>
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
                {...props}
                value={value}
                onChange={handleChange}
            />
        </InputGroup>
    );
};

export default PetSearch;
