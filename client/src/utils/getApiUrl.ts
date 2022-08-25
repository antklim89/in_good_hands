import { API_URL } from '~/constants';


export function getApiURL(url: string): string {
    return `${API_URL}${url}`;
}
