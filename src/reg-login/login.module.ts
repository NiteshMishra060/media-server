import { Module } from "@nestjs/common";
import { AdminLoginService } from "./login.service";
import { AdminLoginController } from "./login.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SignUp } from "./entity/login.entity";
// import { CommonModule } from "../common/common.module";
//import { AuthModule } from "../auth/auth.module";
// import { LoggerModule } from "../common/service/logger.module";

@Module({
  //imports: [TypeOrmModule.forFeature([SignUp])],
  controllers: [AdminLoginController],
  providers: [AdminLoginService],
  exports: [AdminLoginService],
})
export class AdminLoginModule {}
