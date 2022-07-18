import { ADS_LIMIT } from './preview-list.route';

import { Ad } from '~/fastify/swagger';
import { init } from '~/fastify/test';


const { app, db } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/ad/preview-list',
    method: 'GET',
    headers: { 'content-type': 'application/json' },
};

describe('POST /ad/preview-list', () => {
    it('should find all ads', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.length).toBeLessThanOrEqual(ADS_LIMIT);
    });

    it('should finds ads filtered by cursor', async () => {
        const cursor = db().ads[4].id;
        const query: {[P in keyof Ad.PreviewList.RequestQuery]: string} = {
            cursor: String(cursor),
        };

        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
    });

    it('should finds ads filtered by type', async () => {
        const cursor = db().ads[2].id;
        const query: {[P in keyof Ad.PreviewList.RequestQuery]: string} = {
            cursor: String(cursor),
            searchType: 'cat',
        };

        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.id < cursor)).toBeTruthy();
        expect(data.every((ad) => ad.type === query.searchType)).toBeTruthy();
    });

    it('should finds ads filtered by lte price', async () => {
        const query: {[P in keyof Ad.PreviewList.RequestQuery]: string} = {
            ltePrice: '500',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price <= Number(query.ltePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte price', async () => {
        const query: {[P in keyof Ad.PreviewList.RequestQuery]: string} = {
            gtePrice: '500',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        expect(data.every((ad) => ad.price >= Number(query.gtePrice))).toBeTruthy();
    });

    it('should finds ads filtered by gte and gte price', async () => {
        const query: {[P in keyof Ad.PreviewList.RequestQuery]: string} = {
            gtePrice: '200',
            ltePrice: '600',
        };
        const response = await app.inject({ ...defaultOptions, query });
        const data: Ad.PreviewList.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
        const condition = data.every((ad) => ad.price >= Number(query.gtePrice) && ad.price <= Number(query.ltePrice));
        expect(condition).toBeTruthy();
    });
});
