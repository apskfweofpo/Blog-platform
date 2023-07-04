import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {databaseConfig} from "./config/databaseConfig";
import {TypeOrmConfigService} from "./config/typeOrmConfigService"
import {UsersModule} from "./users/users.module";
import {AuthModule} from './auth/auth.module';
import {BlogModule} from './blog/blog.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { CategoriesModule } from './categories/categories.module';
import * as path from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            load: [databaseConfig]
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService
        }),
        UsersModule,
        AuthModule,
        BlogModule,
        FilesModule,
        CategoriesModule
    ],
})
export class AppModule {
}
