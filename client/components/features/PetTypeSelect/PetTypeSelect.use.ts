import { useRouter } from 'next/router';
import { MouseEventHandler, useCallback } from 'react';

import { setSearchParams } from '~/utils';


export const ALL = 'All';

export function usePetTypeSelect() {
    const router = useRouter();

    const handleChange: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        setSearchParams({ router, queryName: 'type', value: e.currentTarget.name, deleteValue: ALL });
    }, [router.query]);

    return { router, handleChange };
}
