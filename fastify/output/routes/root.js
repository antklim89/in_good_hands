"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>route
});
async function route(fastify) {
    fastify.get('/', async (request, reply)=>{
        return {
            root: true
        };
    });
}
