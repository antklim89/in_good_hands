import { ADS_LIMIT } from '@in-good-hands/share/constants';
import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-many.schema';

import { genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/ad${url}`, method } as const;

describe('POST /ad/find-many', () => {
    it('should find all ads', async () => {
        const { data } = await app<Ad.FindMany.ResponseBody>(defaultOptions);

        expect(data.length).toBeGreaterThan(0);
        expect(data.length).toBeLessThanOrEqual(ADS_LIMIT);
    });

    it('should show favorites', async () => {
        await prisma.favorites.create({
            data: {
                adId: db().ads[db().ads.length - 1].id,
                ownerId: db().users[0].id,
            },
        });

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, headers });

        expect(data.length).toBeGreaterThan(0);
        expect(data.filter((i) => i.inFavorites).length).toBeGreaterThan(0);
        expect(data.length).toBeLessThanOrEqual(ADS_LIMIT);
    });

    it('should finds ads filtered by cursor', async () => {
        const cursor = db().ads[4].id;
        const params: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            cursor: String(cursor),
        };

        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
    });

    it('should finds ads filtered by type', async () => {
        const cursor = db().ads[2].id;
        const params: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            cursor: String(cursor),
            searchType: 'cat',
        };

        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
        expect(data.every((ad) => ad.type === params.searchType)).toBeTruthy();
    });

    it('should finds ads filtered by breed', async () => {
        const params = {
            search: 'BEnGaL',
        };

        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });
        expect(data.every((ad) => new RegExp(params.search, 'i').test(ad.breed))).toBeTruthy();

    });

    it('should finds ads filtered by lte price', async () => {
        const params: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            ltePrice: '500',
        };
        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price <= Number(params.ltePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte price', async () => {
        const params: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            gtePrice: '500',
        };
        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price >= Number(params.gtePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte and gte price', async () => {
        const params: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            gtePrice: '200',
            ltePrice: '600',
        };
        const { data } = await app<Ad.FindMany.ResponseBody>({ ...defaultOptions, params });

        expect(data.length).toBeGreaterThan(0);
        const condition = data.every(
            ({ price }) => price >= Number(params.gtePrice) && price <= Number(params.ltePrice),
        );
        expect(condition).toBeTruthy();
    });
});
