import { Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/databaseConfig";
import {UsersService} from "./users/users.service";
import {TypeOrmConfigService} from "./config/typeOrmConfigService"

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
            load: [databaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService
        }),
    ],
    controllers: [],
    providers: [UsersService],
})
export class AppModule {
}
