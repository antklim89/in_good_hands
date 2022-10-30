import { resolve } from 'path';

import { Ad, PrismaClient, User } from '@prisma/client';
import { readdir } from 'fs-extra';
import _ from 'lodash';


const prisma = new PrismaClient();


const ADS_NUMBER = 50;
const IMAGES_IN_AD_NUMBER = 3;


const animals = [
    {
        type: 'cat',
        breeds: ['abyssinian', 'arabian mau', 'balinese', 'bengal', 'british shorthair', 'british longhair', 'siamese'],
    },
    {
        type: 'dog',
        breeds: ['akita', 'borzoi', 'boxer', 'chow chow', 'dobermann', 'miniature fox terrier', 'poodle', 'shar pei'],
    },
    {
        type: 'rodent',
        breeds: ['hamster', 'guinea pig', 'fancy rat', 'fancy mice', 'chinchilla'],
    },
    {
        type: 'bird',
        breeds: ['budgerigar', 'cockatiel', 'cockatoo', 'dove'],
    },
    {
        type: 'aquarium',
        breeds: ['guppies', 'tiger barb', 'gold barb'],
    },

] as const;

async function generateUsers() {
    return Promise.all(_.times(1, () => prisma.user.create({
        data: {
            email: 'anton@mail.ru',
            name: 'anton',
            hash: '$2a$08$6hQB/nrqA0ZI1LkUu0dBVuRWQFTOjMW9qOt2BbHPs6f1n9Fj/tLM6',
        },
    })));
}

async function generateAds(user: User[]) {
    return Promise.all(_.times(ADS_NUMBER, () => {
        const [{ email, tel, telegram, whatsapp, id }] = user;
        const animal = _.sample(animals);
        return prisma.ad.create({
            data: {
                breed: _.sample(animal?.breeds) || 'ordinary',
                type: animal?.type || 'cat',
                birthday: new Date(_.random(1667143159944, 1567143159944, false)),
                description: 'lorem ipsum',
                email,
                tel: tel || '555-55-55',
                telegram,
                whatsapp,
                isPublished: true,
                price: 500,
                ownerId: id,
            },
        });
    }));
}

async function generateImages(ads: Ad[]) {
    return Promise.all(ads.map(({ id, type }) => {
        return Promise.all(_.times(IMAGES_IN_AD_NUMBER, async () => {
            const images = await readdir(resolve(__dirname, '../upload/placeholders'));
            const image = _.sample(images.filter((i) => i.includes(type)));

            return prisma.image.create({
                data: {
                    src: `/upload/placeholders/${image || 'cat1.jpg'}`,
                    thumbnail: 'data:image/jpeg;base64 /9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAP////////////////////////////////////////////////////////////////////////////////////8B///////////////////////////////////////////////////////////////////////////////////////AABEIADIAMgMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AI6AFwaADBoAMGgAwaAEoAKAFBxQA9TnNAD/AMKAEyfT9RQAvagCCgAoAKAJEoAcfpn8cUAJj1GPxoAM+n6mgBh4+tADaACgCRKAH0ANJ5+nT/GgA6ehP+elICMnJpgJQAUASJQA88UAJj3Oe9ABgCgCE0AFACg4oAXdigBd5/z/AProAN5/z/8AroAN5oAZQAUAFABQAUAFABQAUAFAH//Z',
                    adId: id,
                },
            });
        }));
    }));
}

(async () => {
    await prisma.image.deleteMany({});
    await prisma.ad.deleteMany({});
    await prisma.user.deleteMany({});

    const users = await generateUsers();
    const ads = await generateAds(users);
    await generateImages(ads);
})();
