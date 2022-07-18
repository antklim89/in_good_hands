import { Prisma } from '@prisma/client';
import _ from 'lodash';


export const hashedPassword = '$2a$08$JrwM2968gWMa.mm.BGoILO7G9CXOw4WDl5HhofuBGnIZMBB6THq1S'; // qwer123
export const notHashedPassword = 'qwer123';


type CreateUserInput = Partial<Prisma.UserCreateInput>

type CreateAdInput = Partial<Prisma.AdCreateInput> & {
    ownerId: string;
};

export const createUser = (data = {} as CreateUserInput) => ({
    email: `email${_.uniqueId()}@mail.com`,
    hash: hashedPassword,
    name: `Username${_.uniqueId()}`,
    ...data,
});


export const createAd = ({ ownerId, ...data } = {} as CreateAdInput) => ({
    email: `email${_.uniqueId()}@mail.com`,
    name: `petname${_.uniqueId()}`,
    breed: 'haski',
    description: 'Lorem ipsum',
    type: 'dog',
    tel: '555-55-77',
    isPublished: false,
    ...data,
    owner: {
        connect: { id: ownerId },
    },
});
