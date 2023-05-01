import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    Res,
    Query,
    UseGuards,
    Response,
  } from "@nestjs/common";
  import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
 // import { HeadAdminGuard } from "src/auth/guard/head-admin-auth.guard";
  import { responseDto } from "src/mediaServer/dto/response.dto";
  import { AdminLoginService } from "./login.service";
  import { AdminLoginDto, RegisterUserByAdminDto } from "./dto/login.dto";
  import { Cron } from "@nestjs/schedule";
//   import shell from "shelljs";
  @ApiTags("admin-login")
  @ApiBearerAuth()
  @Controller("admin")
  export class AdminLoginController {
    constructor(private readonly adminLoginService: AdminLoginService) {}

  
    @Post("/log-in")
    @ApiResponse({ type: responseDto })
    public async loginAdminUserProcess(
      @Res() res: any,
      @Body() adminLoginDto: AdminLoginDto
    ): Promise<any> {
      let response = await this.adminLoginService.loginAdminUserProcess(
        adminLoginDto
      );
      res.cookie("access_token", response["access_token"], { httpOnly: true });
      //  delete response["access_token"]; DELETE LATER WHEN COOKIES ARE USED TODO:
      res.status(200).json({
        statusCode: 201,
        message: `success`,
        error: ``,
        response: response,
      });
    }

    
    @Post("/Sign-up")
    @ApiResponse({ type: responseDto })
    public async SignUpAdminUserProcess(
      @Res() res: any,
      @Body() registerUserByAdminDto: RegisterUserByAdminDto
    ): Promise<any> {
     // console.log(registerUserByAdminDto);
      let response = await this.adminLoginService.SignUpAdminUserProcess(
        registerUserByAdminDto
      );
      res.cookie("access_token", response["access_token"], { httpOnly: true });
      //  delete response["access_token"]; DELETE LATER WHEN COOKIES ARE USED TODO:
      res.status(200).json({
        statusCode: 201,
        message: `success`,
        error: ``,
        response: response,
      });
    }
}