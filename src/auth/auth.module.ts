// import { forwardRef, Module } from "@nestjs/common";
// import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from "@nestjs/passport";
// import { AuthService } from "./auth.service";
// import { UserAuthStrategy } from "./strategies/user-auth.strategy";

// @Module({
//   imports: [
//     forwardRef(() => PartnersLoginModule),
//     PassportModule,
//     JwtModule.registerAsync({
//       useFactory: async () => ({
//         secret: process.env.JWT_SECRET,
//         signOptions: { expiresIn: "31d" },
//       }),
//     }),
//   ],
//   providers: [
//     AuthService,
//     UserAuthStrategy,
 
//   ],
//   exports: [PassportModule, AuthService],
// })
// export class AuthModule {}
