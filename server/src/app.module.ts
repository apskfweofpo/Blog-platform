import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/databaseConfig";
import {TypeOrmConfigService} from "./config/typeOrmConfigService"
import {UsersModule} from "./users/users.module";
import {AuthModule} from './auth/auth.module';
import {BlogModule} from './blog/blog.module';
import { FilesModule } from './files/files.module';

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
        BlogModule,
        FilesModule
    ],
})
export class AppModule {
}
