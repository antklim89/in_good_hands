/* eslint-disable camelcase */
import zod from 'zod';

import { IEnum_Ad_Type } from '~/generated/graphql';
import { adEditSchema } from '~/layouts/EditAd/EditAd.schema';


export type IEnumAdType = IEnum_Ad_Type

export interface IAdPreview {
    id: string;
    birthday: string;
    type: IEnumAdType;
    breed?: string;
    images: string[]
    price: number;
    createdAt: string;
}

export type IAdEdit = zod.infer<typeof adEditSchema> & { images: string [], id: string }

