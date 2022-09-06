import { Favorites } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/favorites/delete',
    method: 'DELETE',
};


describe('POST /favorites/delete', () => {
    it('should delete favorites', async () => {
        const favoriteToDelete = await prisma.favorites.create({
            data: {
                adId: db().ads[1].id,
                ownerId: db().users[0].id,
            },
        });
        const query: {[P in keyof Favorites.Delete.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });

        const deletedFavorites = await prisma.favorites.findUnique({
            where: {
                id: favoriteToDelete.id,
            },
        });
        expect(response.statusCode).toBe(200);
        expect(deletedFavorites).toBeNull();
    });

    it('should not delete favorites from wrong user', async () => {
        const favoriteToDelete = await prisma.favorites.create({
            data: {
                adId: db().ads[1].id,
                ownerId: db().users[0].id,
            },
        });
        const query: {[P in keyof Favorites.Delete.RequestQuery]: string} = {
            adId: String(db().ads[1].id),
        };

        const headers = {
            authentication: generateJWT(db().users[1]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });

        const deletedFavorites = await prisma.favorites.findUnique({
            where: {
                id: favoriteToDelete.id,
            },
        });
        expect(response.statusCode).toBe(404);
        expect(deletedFavorites).not.toBeNull();
    });
});
