import {registerAs} from '@nestjs/config';

export const sqlConfig = registerAs('database', () => ({
    NODE_ENV: process.env.NODE_ENV,
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    server_port: process.env.SERVER_PORT || 5000,
    port: process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'pass',
    database: process.env.POSTGRES_DB || 'blog-platform',
    migrations: ["dist/migrations/*.js"],
    synchronize: true,
}));