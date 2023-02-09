/* eslint-disable no-await-in-loop */
import { resolve } from 'path';

import { faker } from '@faker-js/faker';
import { Ad, PrismaClient, User } from '@prisma/client';
import { readdir } from 'fs-extra';
import _ from 'lodash';


const prisma = new PrismaClient();


const USERS_NUMBER = 5;
const ADS_NUMBER = 100;
const IMAGES_IN_AD_NUMBER = 1;


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
        const name = faker.name.firstName();
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(name),
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
        const [{ email, tel, telegram, whatsapp, id }] = user;
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
                name: faker.name.lastName(),
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
                    thumbnail: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAP////////////////////////////////////////////////////////////////////////////////////8B///////////////////////////////////////////////////////////////////////////////////////AABEIADIAMgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AI6AFwaADBoAMGgAwaAEoAKAFBxQA9TnNAD/AMKAEyfT9RQAvagCCgAoAKAJEoAcfpn8cUAJj1GPxoAM+n6mgBh4+tADaACgCRKAH0ANJ5+nT/GgA6ehP+elICMnJpgJQAUASJQA88UAJj3Oe9ABgCgCE0AFACg4oAXdigBd5/z/AProAN5/z/8AroAN5oAZQAUAFABQAUAFABQAUAFAH//Z',
                    adId: id,
                },
            });
            imgesResult.push(imageResult);
        }
    }

    return imgesResult;
}

(async () => {
    const adsCount = await prisma.ad.count();
    if (adsCount > 0) return;
    // await prisma.image.deleteMany({});
    // await prisma.ad.deleteMany({});
    // await prisma.user.deleteMany({});

    const users = await generateUsers();
    const ads = await generateAds(users);
    await generateImages(ads);
})();
