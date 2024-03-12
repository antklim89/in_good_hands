import path from 'path';

import { DockerComposeEnvironment, Wait } from 'testcontainers';


const POSTGRES_PASSWORD = 'pass1234';
const JWT_SECRET = 'TEST_SECRET';
const SERVER_PORT = 9000;


export default async function setup({ provide }: { provide: (key: string, value: unknown) => void }) {
    const composeFilePath = path.resolve(process.cwd(), '..');
    const environment = await new DockerComposeEnvironment(
        composeFilePath, 
        ['docker-compose.yml', 'docker-compose.spec.yml'],
    )
        .withWaitStrategy('db-1', Wait.forLogMessage(/.*database system is ready to accept connections.*/))
        .withWaitStrategy('server-1', Wait.forLogMessage(/.*Server is now listening on .*/))
        .withEnvironment({
            POSTGRES_PASSWORD,
            SERVER_PORT: SERVER_PORT.toString(),
            JWT_SECRET,
        })
        .up(['db', 'server']);

    const serverContainer = environment.getContainer('server-1');
    const dbContainer = environment.getContainer('db-1');

    await serverContainer.exec('yarn prisma migrate deploy');
    const [dbNetworkName] = dbContainer.getNetworkNames();
    const dbIpAddress = dbContainer.getIpAddress(dbNetworkName);
    const dbPort = 5432;
    
    const [serverNetworkName] = serverContainer.getNetworkNames();
    const serverIpAddress = serverContainer.getIpAddress(serverNetworkName);
    const serverPort = serverContainer.getMappedPort(8000);

    const datasourceUrl = `postgresql://postgres:${POSTGRES_PASSWORD}@${dbIpAddress}:${dbPort}/postgres`;

    provide('datasourceUrl', datasourceUrl);

    provide('serverNetworkName', serverNetworkName);
    provide('serverIpAddress', serverIpAddress);
    provide('serverPort', serverPort);
    
    provide('dbNetworkName', dbNetworkName);
    provide('dbIpAddress', dbIpAddress);
    provide('dbPort', dbPort);

    provide('JWT_SECRET', JWT_SECRET);

    provide('serverId', serverContainer.getId());
}

declare module 'vitest' {
    export interface ProvidedContext {
        datasourceUrl: string;
        serverNetworkName: string;
        serverIpAddress: string;
        serverPort: string;
        dbNetworkName: string;
        dbIpAddress: string;
        dbPort: string;
        JWT_SECRET: string;
    }
}
