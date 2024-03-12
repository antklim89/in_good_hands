import { describe, expect, it } from 'vitest';

import { init } from '@/test';


const { app, prisma } = init();

describe('Root', () => {
    it('GET /', async () => {
        const users = await prisma.user.findMany();
        const { data } = await app({ url: '/', method: 'GET' });
        expect(data).toHaveProperty('msg', 'ok');
        expect(users).toHaveLength(3);
    });
});
