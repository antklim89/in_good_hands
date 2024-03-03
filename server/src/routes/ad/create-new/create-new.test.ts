import { Ad } from '@in-good-hands/share/swagger';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './create-new.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: InjectOptions = { url: `/ad${url}`, method };

describe('POST /add/create-new', () => {
    it('should create new ad', async () => {
        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };
        const response = await app.inject({ ...defaultOptions, headers });
        const data: Ad.CreateNew.ResponseBody = response.json();

        expect(response.statusCode).toEqual(201);
        expect(data).toHaveProperty('id');

        const newAd = await prisma.ad.findUnique({ where: { id: data.id } });

        expect(newAd).not.toBeNull();
    });

    it('should not create new ad without authentication', async () => {
        const headers = {};

        const response = await app.inject({ ...defaultOptions, headers });

        expect(response.statusCode).toEqual(401);
    });
});
