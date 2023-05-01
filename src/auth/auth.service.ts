// import {
//   forwardRef,
//   Inject,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from "@nestjs/common";
// // import { PartnersLoginService } from "../partners_login/partners_login.service";
// import { JwtService } from "@nestjs/jwt";
// import * as bcrypt from "bcrypt";
// import { JwtPayloadDto } from "./dto/jwt.payload.dto";
// import { AdminLoginService } from "src/reg-login/login.service";

// @Injectable()
// export class AuthService {
//   constructor(
//     // @Inject(forwardRef(() => PartnersLoginService))
//       private readonly AdminLoginService: AdminLoginService,
//     // @Inject(forwardRef(() => PartnersLoginTeamService))
//     // private readonly partnersLoginTeamService: PartnersLoginTeamService,
//     private readonly jwtService: JwtService
//   ) {}

//   async validateUser(username: string, password: string): Promise<Boolean> {
//     const user = await this.AdminLoginService.getUserForAuth(
//       username
//     );
//     let userdata: any;
//     if (!user)
//     userdata = await this.partnersLoginTeamService.loginPartnerTeam(
//         Object.assign(new LoginPartnersTeamDto(), {
//           email: username,
//           password: password,
//         })
//       );
//     if (!user && !partners_team_user) {
//       throw new NotFoundException("user not found");
//     } else {
//       let match = false;
//       if (!partners_team_user)
//         match = await bcrypt.compare(password, user.password);
//       if ((match && user) || partners_team_user) return true;
//       else throw new UnauthorizedException("Wrong password!");
//     }
//   }
//   async login(user: JwtPayloadDto): Promise<string> {
//     const payload = {
//       username: user.username,
//       sub: user.password.length > 0 ? user.password : user.email,
//       role: user.role ? user.role : "infra",
//       blocked: user?.blocked ? user.blocked : false,
//     };
//     console.log(`payload`, payload);
//     return await this.jwtService.signAsync(payload);
//   }
// }
