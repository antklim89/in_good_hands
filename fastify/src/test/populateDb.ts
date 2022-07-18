import { PrismaClient, User } from '@prisma/client';
import _ from 'lodash';


export const hashedPassword = '$2a$08$JrwM2968gWMa.mm.BGoILO7G9CXOw4WDl5HhofuBGnIZMBB6THq1S'; // qwer123
export const notHashedPassword = 'qwer123';

export const createUser = (data: Partial<User> = {}) => ({
    email: `email${_.uniqueId()}@mail.com`,
    hash: hashedPassword,
    name: `Username${_.uniqueId()}`,
    ...data,
});

export async function populateDb(prisma: PrismaClient) {
    await prisma.user.deleteMany();

    const users = await Promise.all(_.times(3, (i) => prisma.user.create({ data: createUser({
        email: `email${i + 1}@mail.com`,
        name: `Username${i + 1}`,
    }) })));

    return {
        users,
    };
}
