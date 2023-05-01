import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  Headers,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Delete,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import { error, profile } from "console";
import { Response } from "express";
import { NotFoundError, of } from "rxjs";
import * as path from "path";
import moment from "moment";
import fs from "fs";
import { BadRequestError } from "passport-headerapikey";
import { MediaService } from "./media.service";
import { responseDto } from "./dto/response.dto";
import { CreateMediaDto,UpdateMediaDto } from "./dto/create-media.dto";
import { hostname } from "os";
@ApiTags("media server")
@ApiBearerAuth()
@Controller("media-server")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post("/upload")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./videos",
        filename: (req: any, file: any, callback): void => {
          const name: string = file.originalname.split(".")[0];
          const fileExtension: string = file.originalname.split(".")[1];
          const newfilename: string =
            name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
          callback(null, newfilename);
        },
      }),
    })
  )
  public async Upload(
   @Query("video_name") video_name: string,
   @Query("video_type") video_type: string,
   @Query("host_name") host_name: string,
   @Query("contactNo") contactno:number,
   @UploadedFile()
    file?: Express.Multer.File
  ): Promise<responseDto> {
    console.log(file.filename);
    if (!file?.filename) {
      return {
        statusCode: 422,
        message: `success`,
        error: ``,
        response: "not suitable file",
      } ;
    }
    const videoaddress = `${process.env.IMAGE_ENDPOINT}api/media-server/videos/${file.filename}`;

    const response = await this.mediaService.addvideos(
      video_name,
      video_type,
      host_name,
      contactno,
      videoaddress,
  );
  
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }
  @Get("/videos/:filename")
  @ApiResponse({ type: responseDto })
  public async getVideos(
    @Param("filename") filename: string,
    @Res() res: Response
  ): Promise<any> {
    try {
      const Path = path.resolve(__dirname, "../../videos", filename);
      console.log(filename);
      console.log(Path)
      res.sendFile(Path);
    } catch (error) {
      throw error.message;
    }
  }

  
  @Patch("/update-video")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./videos",
        filename: (req: any, file: any, callback): void => {
          const name: string = file.originalname.split(".")[0];
          const fileExtension: string = file.originalname.split(".")[1];
          const newfilename: string =
            name.split(" ").join("_") + "_" + Date.now() + "." + fileExtension;
          callback(null, newfilename);
        },
      }),
    })
  )
  public async updateVideoContent(
   @Query("id") id: number,
   @UploadedFile()
    file?: Express.Multer.File
  ): Promise<responseDto> {
    console.log(file.filename);
    if (!file?.filename) {
      return {
        statusCode: 422,
        message: `success`,
        error: ``,
        response: "not suitable file",
      } ;
    }
    const videoaddress = `${process.env.IMAGE_ENDPOINT}api/media-server/videos/${file.filename}`;

    const response = await this.mediaService.updateVideo(
      id,
      videoaddress,
  );
  
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }
  

   
  @Patch("/update-about-video-details")
  @ApiResponse({ type: responseDto })
  public async updateVideoDetails(
   @Query("id") id: number,
   @Query("video_name") video_name?: string,
   @Query("video_type") video_type?: string,
   @Query("host_name") host_name?: string,
   @Query("contactNo") contactno?:number,
   @Query("isActive") isActive?:boolean,
   @Query("isDeleted") isDeleted?:boolean,


  ): Promise<responseDto> {
    const response = await this.mediaService.updateVideoDetails(
      id,
      video_name,
      video_type,
      host_name,
      contactno,
      isActive,
      isDeleted
  );
  
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }
  
     
  @Patch("/update-optional-video-details")
  @ApiResponse({ type: responseDto })
  public async updateVideoDetail(
   @Body() updateMediaDto:UpdateMediaDto
  ): Promise<responseDto> {
    const response = await this.mediaService.updateVideoOptionalDetail(
      updateMediaDto
  );
  
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }
 
  @Get("/get-video")
 // @UseGuards(HeadAdminGuard)
  @ApiResponse({ type: responseDto })
  public async getPartnerProfileImage(
    @Query("video-search") video: string
  ): Promise<responseDto> {
    let response = await this.mediaService.getvideos(
      video
    );
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }

  @Delete("/delete-video-url")
 // @UseGuards(HeadAdminGuard)
  @ApiResponse({ type: responseDto })
  public async removeProfileImage(
    @Query("id") id: number
  ): Promise<responseDto> {
    let response = await this.mediaService.deletevideo(
      id
    );
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }

  @Delete("/delete-all-about-video")
  // @UseGuards(HeadAdminGuard)
   @ApiResponse({ type: responseDto })
   public async hardDeleteProfileImage(
     @Query("id") id: number
   ): Promise<responseDto> {
     let response = await this.mediaService.deleteAllAboutVideo(
       id
     );
     return {
       statusCode: 200,
       message: `success`,
       error: ``,
       response: response,
     };
   }
  


  @Get("/search-video")
  @ApiResponse({ type: responseDto })
  public async SearchUserList(
    @Query("search") search?: string,
  
  ): Promise<responseDto> {
    const response = await this.mediaService.SearchVideo(
      search,
    );
    return {
      statusCode: 200,
      message: `success`,
      error: ``,
      response: response,
    };
  }
}

