import {INestApplication, Logger} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../src/users/users.model";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "../../src/config/databaseConfig";
import {TypeOrmConfigService} from "../../src/config/typeOrmConfigService";
import {UsersModule} from "../../src/users/users.module";
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import {Repository} from "typeorm";

describe('Users controller', () => {
    let app: INestApplication;
    beforeEach(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
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
            ],
        }).compile();

        app = testModule.createNestApplication();
        await app.init();

    })

    afterEach(async () => {



    })


    it('Should create user', async () => {

        const newUser = {
            username: 'test12345',
            email: "test12345@gmail.com",
            password: '12345'
        }

        const response = await request(app.getHttpServer())
            .post('/users/signup')
            .send(newUser);



        const passwordIsValid = await bcrypt.compare(
            newUser.password,
            response.body.password,
        );

        expect(response.body.username).toBe(newUser.username);
        expect(passwordIsValid).toBe(true);
        expect(response.body.email).toBe(newUser.email);

    })
})
