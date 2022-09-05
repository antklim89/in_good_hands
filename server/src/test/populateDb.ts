import { PrismaClient } from '@prisma/client';
import _ from 'lodash';

import { createAd, createImage, createUser } from './dbCreators';


const USERS_QTY = 3;
const ADS_QTY = 20;


export async function populateDb(prisma: PrismaClient) {
    await prisma.image.deleteMany();
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
        breed: (i % 2 === 0) ? 'bengal' : 'husky',
        description: (i % 2 === 0) ? 'lorem' : 'ipsum',
    }) })));

    const images = await Promise.all(_.times(ADS_QTY, () => prisma.image.create({ data: createImage({
        ad: { connect: { id: ads[0].id } },
    }) })));

    return {
        users,
        ads,
        images,
    };
}
