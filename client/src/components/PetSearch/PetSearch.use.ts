import { useRouter } from 'next/router';
import { useRef, ChangeEventHandler, useCallback, useEffect, useState } from 'react';

import { setSearchParams } from '~/utils';


export function usePetSearch() {
    const router = useRouter();
    const [value, setValue] = useState(router.query.search as string || '');
    const timeoutIdRef = useRef<NodeJS.Timeout>();

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setValue(e.target.value);

        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        if (e.target.value.length < 3 && e.target.value.length !== 0) return;

        timeoutIdRef.current = setTimeout(() => {
            setSearchParams({ router, queryName: 'search', value: e.target.value, deleteValue: '' });
        }, 700);
    }, []);

    const handleClear = useCallback(() => {
        setValue('');
        setSearchParams({ router, queryName: 'search', value: '', deleteValue: '' });
    }, []);

    useEffect(() => () => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    }, []);

    return { handleChange, value, setValue, handleClear };
}
