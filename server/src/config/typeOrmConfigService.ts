import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {User} from "../users/users.model";

@Injectable()
export class TypeOrmConfigService  implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {
    }
    createTypeOrmOptions(): TypeOrmModuleOptions {

        const {
            sql: { type,
                host,port,username,password,
                database,synchronize,migrations},
        } = this.configService.get('database');

        return {
            type,
            host,
            port,
            username,
            password,
            database,
            synchronize,
            migrations,
            entities:[User]
        };
    }
}