import zod from 'zod';

import { IAdUpdateDataQuery } from '~/generated/graphql';

import { updateAdSchema } from './UpdateAd.schema';


export interface UpdateAdProps {
     type?: 'create'|'update';
     id: IAdUpdateDataQuery['ad']['data']['id'];
     images: IAdUpdateDataQuery['ad']['data']['attributes']['images']
     initialValues: zod.infer<typeof updateAdSchema>
}
