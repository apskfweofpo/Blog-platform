import {registerAs} from '@nestjs/config';

export const sqlConfig = registerAs('database', () => ({
    NODE_ENV: process.env.NODE_ENV,
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    server_port: process.env.PORT || 5432,
    port: process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'carrynum1',
    database: process.env.DATABASE_NAME || 'blog-platform',
    synchronize: true,
}));