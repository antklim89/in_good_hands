import { API_URL } from '~/constants';
import { Api } from '~/fastify/src/swagger';


export const api = new Api({ baseURL: API_URL });

