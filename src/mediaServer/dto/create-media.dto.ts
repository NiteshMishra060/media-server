import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  video_name?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  video_type?: string;

  @ApiProperty()
  @IsString()
  host_name?: string;

  @ApiProperty()
  @IsNumber()
  contactno?: number;

}

export class UpdateMediaDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  // @IsOptional()
  video_name?: string;

  @ApiProperty()
  @IsString()
  // @IsOptional()
  video_type?: string;

  @ApiProperty()
  // @IsOptional()
  @IsString()
  host_name?: string;

  @ApiProperty()
  // @IsOptional()
  @IsNumber()
  contactno?: number;

  @ApiProperty()
  @IsBoolean()
  // @IsOptional()
  isActive?: boolean;

  @ApiProperty()
  @IsBoolean()
  // @IsOptional()
  isDeleted?: boolean;


}
