import {INestApplication, Logger} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken, InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../../src/users/users.model";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {databaseConfig} from "../../src/config/databaseConfig";
import {TypeOrmConfigService} from "../../src/config/typeOrmConfigService";
import {UsersModule} from "../../src/users/users.module";
import * as bcrypt from "bcrypt";
import * as request from "supertest";
import {Repository} from "typeorm";
import {UsersService} from "../../src/users/users.service";
import {UsersController} from "../../src/users/users.controller";

describe('Users controller', () => {
    let usersService: UsersService;
    let usersRepository: Repository<User>;
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
                TypeOrmModule.forFeature([User]),
                UsersModule,
            ],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();

        app = testModule.createNestApplication();
        await app.init();

    })

    afterEach(async () => {
        usersRepository.delete({
            username: "test12345"
        });
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
