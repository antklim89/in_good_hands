import { Select, SelectProps } from '@chakra-ui/react';
import { animalsTypes } from '@in-good-hands/server/src/schemas/ad.schema';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, useCallback } from 'react';

import { setSearchParams } from '~/utils';


const ALL = 'All';

const PetTypeSelect: FC<SelectProps> = (props) => {
    const router = useRouter();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setSearchParams({ router, queryName: 'type', value: e.target.value, deleteValue: ALL });
    }, [router.query]);

    return (
        <Select onChange={handleChange} {...props} defaultValue={router.query.type}>
            <option value={ALL}>{ALL}</option>
            {animalsTypes.map((animalsType) => (
                <option key={animalsType} value={animalsType}>{animalsType}</option>
            ))}
        </Select>
    );
};

export default PetTypeSelect;


