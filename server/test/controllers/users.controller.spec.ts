import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../src/users/users.model";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

describe('Users controller', () => {
    let app: INestApplication;
    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([User]),
                JwtModule.registerAsync({
                    imports: [ConfigModule],
                    useFactory: (configService: ConfigService) => ({
                        secret: configService.get('JWT_SECRET'),
                        signOptions: {expiresIn: '33d'}
                    }),
                    inject: [ConfigService]
                }),
            ],
        }).compile();

        app = testModule.createNestApplication();
        await app.init();

    })

    afterEach(async () => {
        await User.destroy({where: {username: 'Test'}})
    })
})
