import { useRouter } from 'next/router';
import { ChangeEventHandler, useCallback } from 'react';

import { setSearchParams } from '~/utils';


export const ALL = 'All';

export function usePetTypeSelect() {
    const router = useRouter();

    const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
        setSearchParams({ router, queryName: 'type', value: e.target.value, deleteValue: ALL });
    }, [router.query]);

    return { router, handleChange };
}
