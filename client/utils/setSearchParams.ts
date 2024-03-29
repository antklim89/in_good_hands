import { NextRouter } from 'next/router';


interface Arguments {
    router: NextRouter;
    queryName: string;
    path?: string;
    value: string;
    deleteValue: string;
}
export function setSearchParams({
    router, queryName, path = '/ads', value, deleteValue,
}: Arguments) {
    const params = new URLSearchParams(router.query as Record<string, string>);
    if (value === deleteValue) params.delete(queryName);
    else params.set(queryName, value);

    if (params.toString().length === 0) router.push(path);
    else router.push(`${path}?${params}`);
}
