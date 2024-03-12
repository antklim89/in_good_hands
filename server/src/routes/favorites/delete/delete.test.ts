import { Favorites } from '@in-good-hands/share/swagger';
import { describe, expect, it } from 'vitest';

import { method, url } from './delete.schema';

import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions = { url: `/favorites${url}`, method };


describe('POST /favorites/delete', () => {
    it('should delete favorites', async () => {
        const favoriteToDelete = await prisma.favorites.create({
            data: {
                adId: db().ads[1].id,
                ownerId: db().users[0].id,
            },
        });
        const params: {[P in keyof Favorites.Delete.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const { status } = await app({ ...defaultOptions, params, headers });

        const deletedFavorites = await prisma.favorites.findUnique({
            where: {
                id: favoriteToDelete.id,
            },
        });
        expect(status).toBe(200);
        expect(deletedFavorites).toBeNull();
    });

    it('should not delete favorites from wrong user', async () => {
        const favoriteToDelete = await prisma.favorites.create({
            data: {
                adId: db().ads[1].id,
                ownerId: db().users[0].id,
            },
        });
        const params: {[P in keyof Favorites.Delete.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const { status } = await app({ ...defaultOptions, params, headers });

        const deletedFavorites = await prisma.favorites.findUnique({
            where: {
                id: favoriteToDelete.id,
            },
        });
        expect(status).toBe(400);
        expect(deletedFavorites).not.toBeNull();
    });
});
