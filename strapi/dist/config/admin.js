"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = ({ env }) => ({ auth: { secret: env('ADMIN_JWT_SECRET', '700bcf6ca7f67b35f4813f3ffa483f87') } });
exports.default = admin;
