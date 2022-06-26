import zod from 'zod';

import { IAdUpdateDataQuery } from '~/generated/graphql';

import { adEditSchema } from './EditAd.schema';


export interface EditAdProps {
     type?: 'create'|'update';
     id: IAdUpdateDataQuery['ad']['data']['id'];
     images: IAdUpdateDataQuery['ad']['data']['attributes']['images']
     initialValues: zod.infer<typeof adEditSchema>
}
