import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
//import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { DataSource } from "typeorm";
// import { AuthModule } from "./auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";
import { MediaModule } from "./mediaServer/media.module";
import { AdminLoginModule } from "./reg-login/login.module";
//import { AdminLoginModule } from "./admin-login/admin-login.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: "default",
      useFactory: async () =>
        ({
          type: process.env.DB_TYPE as "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.PGPORT),
          username: process.env.PGUSER,
          password: process.env.PGPASSWORD,
          database: process.env.PGDATABASE,
          migrations: [__dirname + "/migrations/**/*.{ts,js}"],
          autoLoadEntities: true,
          extra: {
            charset: "utf8mb4_unicode_ci",
            connectionLimit: 40,
          },
          entities: [__dirname + "/**/*.entity.{ts,js}"],
          synchronize:true,
          logging: Boolean(parseInt(process.env.DB_LOGGING)),
        } as TypeOrmModuleOptions),
    }),
    ScheduleModule.forRoot(),
    MediaModule,
    AdminLoginModule
    // PartnersLoginModule,
    // PartnerProfileModule,
    // PartnerBillingDetailsModule,
    //AuthModule,
    // LoggerModule,
    // PartnerProfileModule,
    // PartnerBillingDetailsModule,
    // PaymentModule,
    // PartnerPlanModule,
    // AdminLoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{}
// {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes("/");
//   }
// }
