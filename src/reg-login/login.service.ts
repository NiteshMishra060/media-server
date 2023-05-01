import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
  } from "@nestjs/common";
  import { Base } from "../common/base";
  import { v4 as uuidv4 } from "uuid";
  import { AdminLoginDto, RegisterUserByAdminDto } from "./dto/login.dto";
  import * as bcrypt from "bcrypt";
  import { Any, DeleteResult, InsertResult, UpdateResult } from "typeorm";
  import * as moment from "moment";
  import * as path from "path";
  import * as fs from "fs";
  //import { AuthService } from "src/auth/auth.service"; 
  import { SignUp } from "./entity/login.entity";
//import { AuthService } from "src/auth/auth.service";
 // import { JwtPayloadDto } from "src/auth/dto/jwt.payload.dto";
  @Injectable()
  export class AdminLoginService extends Base {
    constructor(
   //  private readonly authService: AuthService,
    //   private readonly loggerHelperService: LoggerHelperService
    ) {
      super();
    }
     public async loginAdminUserProcess(
        adminLoginDto: AdminLoginDto
      ): Promise<any> {
        try {
          const manager = await this.getDataSourceManager();
       
          let admin: any = await manager
            .createQueryBuilder(SignUp, "signUp")
            .select()
            .where("signUp.username = :username", {
              username: adminLoginDto.username,
            })
            .getOne();
          if (!admin) throw new NotFoundException("no such user found");
          const check = await bcrypt.compare(
            adminLoginDto.password,
            admin.password
          );
          if (!check) throw new UnauthorizedException(`incorrect password`);
    
        //   const loginJwtToken = await this.authService.login(
        //     Object.assign(new JwtPayloadDto(), {
        //       username: adminLoginDto.username,
        //       password: adminLoginDto.password,
        //     })
        //   );
        //  admin["access_token"] = loginJwtToken;
          return "You are login successfully";
        } catch (error) {
          if (error instanceof NotFoundException)
            throw new NotFoundException(error.message);
          if (error instanceof UnauthorizedException)
            throw new UnauthorizedException(error.message);
          throw new InternalServerErrorException(error.message);
        }
      }
     

      // public async getUserForAuth(username: string): Promise<any> {
      //   const manager = await this.getDataSourceManager();
      //   const user = await manager
      //     .createQueryBuilder(SignUp, "signUp")
      //     .select()
      //     .where("signUp.username = :username")
      //     .setParameter("username", username)
      //     .andWhere("signUp.isDeleted = false")
      //     .getOne();
      //   return user;
      // }

      public async SignUpAdminUserProcess(
        registerUserByAdminDto: RegisterUserByAdminDto
      ): Promise<any> {
        try {
          //console.log(registerUserByAdminDto);
            let result:any;
            let pass:string=registerUserByAdminDto.password;
            //console.log(pass)
           let hashpassword:any=await bcrypt.hash(pass, 10);
          // console.log(hashpassword)
          const manager = await this.getDataSourceManager();
        
          await manager.transaction(async (transactionalEntityManager) => {
            result = await transactionalEntityManager
              .createQueryBuilder()
              .insert()
              .into(SignUp)
              .values({
              username: registerUserByAdminDto.username,
              name: registerUserByAdminDto?.name,
              isActive: registerUserByAdminDto?.isActive,
              isDeleted: registerUserByAdminDto?.isDeleted,
              isBlocked: registerUserByAdminDto?.isBlocked,
              password: hashpassword,
              })
              .execute();
          });
        //   if (!admin) throw new NotFoundException("no such user found");
        //   const check = await bcrypt.compare(
        //     adminLoginDto.password,
        //     admin.password
        //   );
        //   if (!check) throw new UnauthorizedException(`incorrect password`);
    
          // const loginJwtToken = await this.authService.login(
          //   Object.assign(new JwtPayloadDto(), {
          //     username: adminLoginDto.username,
          //     password: adminLoginDto.password,
          //   })
          // );
          // admin["access_token"] = loginJwtToken;
          return result;
        } catch (error) {
          if (error instanceof NotFoundException)
            throw new NotFoundException(error.message);
          if (error instanceof UnauthorizedException)
            throw new UnauthorizedException(error.message);
          throw new InternalServerErrorException(error.message);
        }
      }
  }  