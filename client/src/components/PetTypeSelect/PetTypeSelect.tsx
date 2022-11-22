import { Select, SelectProps } from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/server/src/schemas/adSchemas';
import { FC } from 'react';

import { ALL, usePetTypeSelect } from './PetTypeSelect.use';


const PetTypeSelect: FC<SelectProps> = (props) => {
    const { router, handleChange } = usePetTypeSelect();

    return (
        <Select
            onChange={handleChange} {...props} defaultValue={router.query.type}
            textTransform="uppercase"
        >
            <option value={ALL}>{ALL}</option>
            {animalsTypes.map((animalsType) => (
                <option key={animalsType} value={animalsType}>{animalsType}</option>
            ))}
        </Select>
    );
};

export default PetTypeSelect;


