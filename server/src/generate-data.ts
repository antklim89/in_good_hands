/* eslint-disable no-await-in-loop */
import { resolve } from 'path';

import { faker } from '@faker-js/faker';
import { Ad, PrismaClient, User } from '@prisma/client';
import { readdir } from 'fs-extra';
import _ from 'lodash';


const prisma = new PrismaClient();


const USERS_NUMBER = 5;
const ADS_NUMBER = 100;
const IMAGES_IN_AD_NUMBER = 3;


const animals = [
    {
        type: 'cat',
        breeds: _.times(20, faker.animal.cat),
    },
    {
        type: 'dog',
        breeds: _.times(20, faker.animal.dog),
    },
    {
        type: 'rodent',
        breeds: _.times(20, faker.animal.rodent),
    },
    {
        type: 'bird',
        breeds: _.times(20, faker.animal.bird),
    },
    {
        type: 'aquarium',
        breeds: _.times(20, faker.animal.fish),
    },

] as const;

async function generateUsers() {
    const admin = await prisma.user.create({
        data: {
            email: 'anton@mail.ru',
            name: 'anton',
            hash: '$2a$08$6hQB/nrqA0ZI1LkUu0dBVuRWQFTOjMW9qOt2BbHPs6f1n9Fj/tLM6',
            tel: faker.phone.number(),
        },
    });
    const users = [admin];
    for (let index = 0; index < USERS_NUMBER; index += 1) {
        const name = faker.person.firstName();
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email({firstName: name}),
                name,
                hash: '$2a$08$6hQB/nrqA0ZI1LkUu0dBVuRWQFTOjMW9qOt2BbHPs6f1n9Fj/tLM6',
                tel: faker.phone.number(),
            },
        });
        users.push(user);
    }

    return users;
}

async function generateAds(user: User[]) {
    const ads = [];
    for (let index = 0; index < ADS_NUMBER; index += 1) {
        const { email, tel, telegram, whatsapp, id } = _.sample(user) || user[0];
        const animal = _.sample(animals);
        const ad = await prisma.ad.create({
            data: {
                breed: _.sample(animal?.breeds) || 'ordinary',
                type: animal?.type || 'cat',
                birthday: faker.date.birthdate({ max: 7, min: 0, mode: 'age' }),
                description: faker.lorem.sentences(5),
                email,
                tel: tel || faker.phone.number(),
                telegram,
                whatsapp,
                isPublished: true,
                price: Number(faker.finance.amount(100, 5000)),
                ownerId: id,
                name: faker.person.lastName(),
            },
        });
        ads.push(ad);
    }
    return ads;
}

async function generateImages(ads: Ad[]) {
    const imgesResult = [];
    for (let i = 0; i < ads.length; i += 1) {
        const { id, type } = ads[i];

        for (let j = 0; j < IMAGES_IN_AD_NUMBER; j += 1) {
            const images = await readdir(resolve(__dirname, '../upload/placeholders'));
            const image = _.sample(images.filter((img) => img.includes(type)));

            const imageResult = await prisma.image.create({
                data: {
                    src: `/upload/placeholders/${image || 'cat1.jpg'}`,
                    thumbnail: 'data:image/webp;base64, UklGRpoAAABXRUJQVlA4II4AAACwBgCdASpAADAAP83g42g/ua+nqrgM+/A5iUAaU+uQjGKOKGvBugQuGqIXQ9WBeLmjNjyMtfyzeyEABg43gAD+6sy9j2kK2/pd3kla4LZS8P828Gu2oLW9n+4XI9IYQRjcWR5HsGBPaF2b5xIszzJdsNU5lu1bYPxz+J4Hcm6RJilRJArCK/LBmW6IoAAA',
                    adId: id,
                },
            });
            imgesResult.push(imageResult);
        }
    }

    return imgesResult;
}

(async () => {
    await prisma.image.deleteMany({});
    await prisma.ad.deleteMany({});
    await prisma.user.deleteMany({});

    const users = await generateUsers();
    const ads = await generateAds(users);
    await generateImages(ads);
})();
