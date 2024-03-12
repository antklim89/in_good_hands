import { Ad } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { url, method } from './find-ids.schema';

import { init } from '@/test';


const { app } = init();

const defaultOptions = { url: `/ad${url}`, method, query: { foo: 'bar' } } as const;


describe('GET /ad/find-ids', () => {
    it('should return ads ids', async () => {
        const { data } = await app<Ad.FindIds.ResponseBody>(defaultOptions);

        expect(data.length).toBeGreaterThan(0);
    });
});
