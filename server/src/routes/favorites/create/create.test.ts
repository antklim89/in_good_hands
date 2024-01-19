import { Favorites } from '@in-good-hands/share/swager';
import type { InjectOptions } from 'fastify';
import { describe, expect, it } from 'vitest';

import { method, url } from './create.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: InjectOptions = { url: `/favorites${url}`, method };


describe('POST /favorites/create', () => {
    it('should add favorites', async () => {
        const query: {[P in keyof Favorites.Create.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });
        const data = response.json();
        expect(response.statusCode).toBe(200);

        const createdFavorite = await prisma.favorites.findUnique({
            where: { id: data },
        });
        expect(createdFavorite).not.toBeNull();
    });

    it('should not add existed favorites', async () => {
        const query: {[P in keyof Favorites.Create.RequestQuery]: string} = {
            adId: String(db().ads[0].id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });

        expect(response.statusCode).toBe(400);
    });
});
