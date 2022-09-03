

jest.mock('../constants', () => ({
    JWT_SECRET: 'secret',
    UPLOAD_BASE_URL: '/upload',
    UPLOAD_BASE_PATH: '/tmp/fastify/upload/',
    UPLOAD_IMAGES_BASE_URL: '/upload/images',
    UPLOAD_IMAGES_BASE_PATH: '/tmp/fastify/upload/images',
}));
