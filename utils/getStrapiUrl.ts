import { STRAPI_URL } from '~/constants';


export function getStrapiUrl(url: string): string {
    return `${STRAPI_URL}${url}`;
}
