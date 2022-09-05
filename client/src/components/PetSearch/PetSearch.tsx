import { Input, InputProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEventHandler, FC, useCallback, useEffect, useRef } from 'react';

import { setSearchParams } from '~/utils';


const PetSearch: FC<InputProps> = (props) => {
    const router = useRouter();
    const timeoutIdRef = useRef<NodeJS.Timeout>();

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

        timeoutIdRef.current = setTimeout(() => {
            setSearchParams({ router, queryName: 'search', value: e.target.value, deleteValue: '' });
        }, 700);
    }, [router.query]);

    useEffect(() => () => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    }, []);

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
