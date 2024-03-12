import { Favorites } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './create.schema';

import { genTestJWT, init } from '@/test';


const { app, db, prisma } = init();

const defaultOptions = { url: `/favorites${url}`, method };


describe('POST /favorites/create', () => {
    it('should add favorites', async () => {
        const params: {[P in keyof Favorites.Create.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: genTestJWT(db().users[1]),
        };

        const { data, status } = await app<Favorites.Create.ResponseBody>(
            { ...defaultOptions, params, headers, data: {} },
        );
        expect(status).toBe(200);

        const createdFavorite = await prisma.favorites.findUnique({
            where: { id: data },
        });
        expect(createdFavorite).not.toBeNull();
    });

    it('should not add existed favorites', async () => {
        const params: {[P in keyof Favorites.Create.RequestQuery]: string} = {
            adId: String(db().ads[0].id),
        };

        const headers = {
            authentication: genTestJWT(db().users[0]),
        };

        const { status } = await app({ ...defaultOptions, params, headers, data: {} });

        expect(status).toBe(400);
    });
});
