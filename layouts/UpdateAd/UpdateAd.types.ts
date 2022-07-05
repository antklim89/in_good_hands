import zod from 'zod';

import { IAdUpdateDataQuery } from '~/generated/graphql';

import { updateAdSchema } from './UpdateAd.schema';


export interface UpdateAdProps {
     type?: 'create'|'update';
     id: IAdUpdateDataQuery['ads']['data'][0]['id'];
     images: IAdUpdateDataQuery['ads']['data'][0]['attributes']['images']
     initialValues: zod.infer<typeof updateAdSchema>
}
