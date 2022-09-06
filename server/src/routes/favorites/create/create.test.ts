import { Favorites } from '@/swagger';
import { init } from '@/test';
import { generateJWT } from '@/utils';


const { app, db, prisma } = init();

const defaultOptions: import('light-my-request').InjectOptions = {
    url: '/favorites/create',
    method: 'POST',
};


describe('POST /favorites/create', () => {
    it('should delete favorites', async () => {
        const query: {[P in keyof Favorites.Create.RequestQuery]: string} = {
            adId: String(db().ads[0].id),
        };

        const headers = {
            authentication: generateJWT(db().users[0]).token,
        };

        const response = await app.inject({ ...defaultOptions, query, headers });
        const data = response.json();
        expect(response.statusCode).toBe(200);

        const createdFavorite = await prisma.favorites.findUnique({
            where: {
                id: data,
            },
        });
        expect(createdFavorite).not.toBeNull();
    });
});