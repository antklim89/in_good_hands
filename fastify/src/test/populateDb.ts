import { PrismaClient, User } from '@prisma/client';
import _ from 'lodash';


const hash = '$2a$08$JrwM2968gWMa.mm.BGoILO7G9CXOw4WDl5HhofuBGnIZMBB6THq1S'; // qwer123


export const createUser = (data: Partial<User> = {}) => ({
    email: `email${_.uniqueId()}@mail.com`,
    hash,
    name: `Username${_.uniqueId()}`,
    ...data,
});

export async function populateDb(prisma: PrismaClient) {
    await prisma.user.deleteMany();
    return prisma.user.createMany({
        data: _.times(3, (i) => createUser({
            email: `email${i + 1}@mail.com`,
            name: `Username${i + 1}`,
        })),
    });
}
