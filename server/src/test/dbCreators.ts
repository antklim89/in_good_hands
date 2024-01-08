import { randomUUID } from 'crypto';
import { join } from 'path';

import { Prisma } from '@prisma/client';
import fs from 'fs-extra';
import _ from 'lodash';

import { UPLOAD_IMAGES_BASE_URL } from '@/constants';
import { getImagePathBySrc } from '@/utils';


export const hashedPassword = '$2a$08$JrwM2968gWMa.mm.BGoILO7G9CXOw4WDl5HhofuBGnIZMBB6THq1S'; // qwer123
export const notHashedPassword = 'qwer123';


type CreateUserReturn<T> = Prisma.UserCreateInput & T;

export function createUser<T extends Partial<Prisma.UserCreateInput>>(data = {} as T): CreateUserReturn<T> {
    return {
        email: `email${_.uniqueId()}@mail.com`,
        hash: hashedPassword,
        name: `Username${_.uniqueId()}`,
        ...data,
    };
}


type CreateAdReturn<T> = Omit<Prisma.AdCreateInput, 'owner'> & T;

export function createAd<T extends Partial<Prisma.AdCreateInput>>(data = {} as T): CreateAdReturn<T> {
    return {
        email: 'email@mail.com',
        name: 'petname',
        breed: 'haski',
        description: 'Lorem ipsum',
        type: 'dog',
        tel: '555-55-55',
        isPublished: true,
        price: 100,
        ...data,
    };
}


type CreateImageReturn<T> = Omit<Prisma.ImageCreateInput, 'ad'> & T;

export function createImage<T extends Partial<Prisma.ImageCreateInput>>(data = {} as T): CreateImageReturn<T> {
    const image: CreateImageReturn<T> = {
        src: join(UPLOAD_IMAGES_BASE_URL, randomUUID()),
        thumbnail: '',
        ...data,
    };

    const imageToDeletePath = getImagePathBySrc(image.src);

    fs.mkdirSync(join(imageToDeletePath, '..'), { recursive: true });
    fs.writeFileSync(imageToDeletePath, 'test');

    return image;
}
