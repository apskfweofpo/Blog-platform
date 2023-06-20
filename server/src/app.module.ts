import { Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/databaseConfig";
import {UsersService} from "./users/users.service";
import {TypeOrmConfigService} from "./config/typeOrmConfigService"
import {UsersController} from "./users/users.controller";
import {User} from "./users/users.model";
import {UsersModule} from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        UsersModule,
        AuthModule,
        BlogModule
    ],
})
export class AppModule {
}
