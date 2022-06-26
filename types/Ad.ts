import zod from 'zod';

import { adEditSchema } from '~/layouts/EditAd/EditAd.schema';


export interface IAdPreview {
    id: string;
    birthday: string;
    type: string;
    breed?: string;
    images: string[]
    price: number;
    createdAt: string;
}

export type IAdEdit = zod.infer<typeof adEditSchema> & { id: string }
