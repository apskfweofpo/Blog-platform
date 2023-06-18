import { Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/databaseConfig";
import {UsersService} from "./users/users.service";
import {TypeOrmConfigService} from "./config/typeOrmConfigService"
import {UsersController} from "./users/users.controller";
import {User} from "./users/users.model";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt( process.env.DATABASE_PORT) || 5432,
            username: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'carrynum1',
            database: process.env.DATABASE_NAME || 'blog-platform',
            synchronize: true,
            entities: [User]
        }),
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class AppModule {
}
