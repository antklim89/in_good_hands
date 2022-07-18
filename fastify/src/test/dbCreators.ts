import { Prisma } from '@prisma/client';
import _ from 'lodash';


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
        email: `email${_.uniqueId()}@mail.com`,
        name: `petname${_.uniqueId()}`,
        breed: 'haski',
        description: 'Lorem ipsum',
        type: 'dog',
        tel: '555-55-55',
        isPublished: false,
        price: 100,
        ...data,
    };
}
