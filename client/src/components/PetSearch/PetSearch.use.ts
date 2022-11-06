import { useRouter } from 'next/router';
import { useRef, ChangeEventHandler, useCallback, useEffect } from 'react';

import { setSearchParams } from '~/utils';


export function usePetSearch() {
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

    return { router, handleChange };
}
