import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsISO8601, IsNumber, IsOptional, IsString } from "class-validator";

export class AdminLoginDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}


export class RegisterUserByAdminDto {
 
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean;
}

export class updateDto {
  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  @IsString()
  id: string;
}
