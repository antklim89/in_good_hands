import { Ad } from '@in-good-hands/share/swager';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './find-ids.schema';

import { init } from '@/test';


const { app } = init();

const defaultOptions: InjectOptions = { url: `/ad${url}`, method };


describe('GET /ad/find-ids', () => {
    it('should return ads ids', async () => {
        const response = await app.inject({ ...defaultOptions });
        const data: Ad.FindIds.ResponseBody = response.json();

        expect(data.length).toBeGreaterThan(0);
    });
});
