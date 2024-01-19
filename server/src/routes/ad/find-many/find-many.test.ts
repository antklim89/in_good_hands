import { ADS_LIMIT } from '@in-good-hands/share/constants';
import { Ad } from '@in-good-hands/share/swager';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-many.schema';


import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: InjectOptions = { url: `/ad${url}`, method };

describe('POST /ad/find-many', () => {
    it('should find all ads', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data: Ad.FindMany.ResponseBody = response.json();

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
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.filter((i) => i.inFavorites).length).toBeGreaterThan(0);
        expect(data.length).toBeLessThanOrEqual(ADS_LIMIT);
    });

    it('should finds ads filtered by cursor', async () => {
        const cursor = db().ads[4].id;
        const query: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            cursor: String(cursor),
        };

        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
    });

    it('should finds ads filtered by type', async () => {
        const cursor = db().ads[2].id;
        const query: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            cursor: String(cursor),
            searchType: 'cat',
        };

        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
        expect(data.every((ad) => ad.type === query.searchType)).toBeTruthy();
    });

    it('should finds ads filtered by breed', async () => {
        const query = {
            search: 'BEnGaL',
        };

        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();
        expect(data.every((ad) => new RegExp(query.search, 'i').test(ad.breed))).toBeTruthy();

    });

    it('should finds ads filtered by lte price', async () => {
        const query: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            ltePrice: '500',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price <= Number(query.ltePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte price', async () => {
        const query: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            gtePrice: '500',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price >= Number(query.gtePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte and gte price', async () => {
        const query: {[P in keyof Ad.FindMany.RequestQuery]: string} = {
            gtePrice: '200',
            ltePrice: '600',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.FindMany.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        const condition = data.every((ad) => ad.price >= Number(query.gtePrice) && ad.price <= Number(query.ltePrice));
        expect(condition).toBeTruthy();
    });
});
