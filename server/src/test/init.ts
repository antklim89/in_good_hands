import { PrismaClient } from '@prisma/client';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { afterAll, beforeAll, inject } from 'vitest';

import { populateDb } from './populateDb';


export const init = () => {
    const prisma = new PrismaClient({ datasourceUrl: inject('datasourceUrl') });

    const app = async <Data = unknown>(args: AxiosRequestConfig) => {
        const axiosInstance = axios.create({
            baseURL: `http://localhost:${inject('serverPort')}`,
        });

        const result = await axiosInstance.request<Data>(args).catch((err: AxiosError) => err.response);

        return { 
            data: result?.data as Data, 
            status: result?.status || null, 
        };
    };   

    let db: Awaited<ReturnType<typeof populateDb>>;

    beforeAll(async () => {
        await prisma.$connect();
        db = await populateDb(prisma);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    return {
        app,
        prisma,
        db: () => db,
    };
};
