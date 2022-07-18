import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

import { createAd, createUser } from './dbCreators';


export async function populateDb(prisma: PrismaClient) {
    await prisma.ad.deleteMany();
    await prisma.user.deleteMany();

    const users = await Promise.all(_.times(3, (i) => prisma.user.create({ data: createUser({
        email: `email${i + 1}@mail.com`,
        name: `Username${i + 1}`,
    }) })));

    const ads = await Promise.all(_.times(3, () => prisma.ad.create({ data: createAd({
        ownerId: users[0].id,
    }) })));

    return {
        users,
        ads,
    };
}
