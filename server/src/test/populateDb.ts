import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

import { createAd, createUser } from './dbCreators';


const USERS_QTY = 3;
const ADS_QTY = 20;


export async function populateDb(prisma: PrismaClient) {
    await prisma.ad.deleteMany();
    await prisma.user.deleteMany();

    const users = await Promise.all(_.times(USERS_QTY, (i) => prisma.user.create({ data: createUser({
        email: `email${i + 1}@mail.com`,
        name: `Username${i + 1}`,
    }) })));

    const ads = await Promise.all(_.times(ADS_QTY, (i) => prisma.ad.create({ data: createAd({
        owner: { connect: { id: users[0].id } },
        price: (i + 1) * 100,
        type: (i % 2 === 0) ? 'cat' : 'dog',
    }) })));

    return {
        users,
        ads,
    };
}
