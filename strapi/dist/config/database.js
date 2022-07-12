"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const database = ({ env }) => ({
    connection: {
        client: 'sqlite',
        connection: { filename: path_1.default.join(__dirname, '..', '..', env('DATABASE_FILENAME', 'database/data.db')) },
        useNullAsDefault: true,
    },
});
exports.default = database;
