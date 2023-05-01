import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/create-media.dto';
import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  Res,
} from "@nestjs/common";
import { InsertResult } from "typeorm";


// import axios from "axios";
import { json } from "stream/consumers";
import * as path from "path";
import * as fs from "fs";
import {
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common/exceptions";
import { NotFoundError } from "rxjs";
import { Base } from 'src/common/base';
import { Media } from './entities/media.entity';
//import { PartnerProfileImage } from "./entities/profile-image.entity";

@Injectable()
export class MediaService extends Base {
  constructor() {
    super()
  }

  public async addvideos(
    video_name: string,
    video_type: string,
    host_name: string,
    contactno: number,
    videoaddress: string,
  ): Promise<any> {
    try {
      let result: any;
      const manager = await this.getDataSourceManager();
      await manager.transaction(async (transactionalEntityManager) => {
        result = await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(Media)
          .values({
            video_name: video_name,
            video_type: video_type,
            host_name: host_name,
            contactNo: contactno,
            videoUrl: videoaddress,
          })
          .execute();
      });
      console.log(result);
    } catch (e) {
      return { success: false, message: e.message };
    }

  }

  public async  updateVideo(
    id: number,
    videoaddress: string,
  ): Promise<any> {
    try {
      let result: any;
      const manager = await this.getDataSourceManager();
      await manager.transaction(async (transactionalEntityManager) => {
        result = await transactionalEntityManager
          .createQueryBuilder()
          .update(Media)
          .set({
            videoUrl: videoaddress,

          })
          .where("Media.id= :id", { id: id })
          .execute();
      });
      console.log(result);
    } catch (e) {
      return { success: false, message: e.message };
    }
  }



  public async updateVideoDetails(
    id: number,
    video_name?: string,
    video_type?: string,
    host_name?: string,
    contactno?: number,
    isActive?: boolean,
    isDeleted?: boolean
  ): Promise<any> {
    try {
      let result: any;
      const manager = await this.getDataSourceManager();
      await manager.transaction(async (transactionalEntityManager) => {
        result = await transactionalEntityManager
          .createQueryBuilder()
          .update(Media)
          .set({
            video_name: video_name,
            video_type: video_type,
            host_name: host_name,
            contactNo: contactno,
            isActive: isActive,
            isDeleted: isDeleted,
          })
          .where("Media.id= :id", { id: id })
          .execute();
      });
      console.log(result);
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  public async updateVideoOptionalDetail(
    updateMediaDto: UpdateMediaDto
  ): Promise<any> {
    try {
      let result: any;
      const manager = await this.getDataSourceManager();
      await manager.transaction(async (transactionalEntityManager) => {
        result = await transactionalEntityManager
          .createQueryBuilder()
          .update(Media)
          .set({
            video_name: updateMediaDto?.video_name,
            video_type: updateMediaDto?.video_type,
            host_name: updateMediaDto?.host_name,
            contactNo: updateMediaDto?.contactno,
            isActive: updateMediaDto?.isActive,
            isDeleted: updateMediaDto?.isDeleted,
          })
          .where("Media.id = :id", { id: updateMediaDto.id })
          .execute();
      });
      console.log(result);
      return result;
    } catch (e) {
      return { success: false, message: e.message };
    }

  }
  
  public async getvideos(video: string): Promise<any> {
    try {
      const manager = await this.getDataSourceManager();
      const query = await manager
        .createQueryBuilder(Media, "Media")
        .select()
        .where("Media.video_name = :video", { video: video })
        .getOne();
      console.log(query);
      if (query == null || JSON.stringify(query) == "[]")
        return ` this type of video is not present`;
      return query;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      else throw new InternalServerErrorException(error.message);
    }
  }

  public async getAllvideos(): Promise<any> {
    try {
      const manager = await this.getDataSourceManager();
      const query = await manager
        .createQueryBuilder(Media, "Media")
        .select()
        .getMany();
      console.log(query);
      if (query == null || JSON.stringify(query) == "[]")
        return ` this type of video is not present`;
      return query;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
      else throw new InternalServerErrorException(error.message);
    }
  }

  public async deletevideo(id: number): Promise<any> {
    try {
      const manager = await this.getDataSourceManager();
      let MediaData = await manager
        .createQueryBuilder(Media, "Media")
        .select()
        .where("Media.id = :id", { id: id })
        .getOne();
      if (MediaData.videoUrl) {
        let file = MediaData.videoUrl.split("/");
        let len = file.length;
        let fileName = file[len - 1];
        const Path = path.resolve(__dirname, "../../videos", fileName);
        fs.unlink(Path, (err) => {
          if (err) {
            return err;
          }
        });
      } else {
        return "there is no video present for this perticuler Id";
      }
      let removevideo: any;
      await manager.transaction(async (transactionalEntityManager) => {
        removevideo = await transactionalEntityManager
          .createQueryBuilder()
          .update(Media)
          .set({
            videoUrl: null,
            isDeleted: true,
            isActive: false
          })
          .where("id = :id", { id: id })
          .execute();
      });
      return removevideo;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  public async deleteAllAboutVideo(id: number): Promise<any> {
    try {
      const manager = await this.getDataSourceManager();
      let MediaData = await manager
        .createQueryBuilder(Media, "Media")
        .select()
        .where("Media.id = :id", { id: id })
        .getOne();
      if (MediaData) {
        if (MediaData.videoUrl) {
          let file = MediaData.videoUrl.split("/");
          let len = file.length;
          let fileName = file[len - 1];
          const Path = path.resolve(__dirname, "../../videos", fileName);
          fs.unlink(Path, (err) => {
            if (err) {
              return err;
            }
          });

          let removevideo: any;
          await manager.transaction(async (transactionalEntityManager) => {
            removevideo = await transactionalEntityManager
              .createQueryBuilder()
              .delete()
              .from(Media)
              .where("id = :id", { id: id })
              .execute();
          });
          return removevideo;
        }

        else {
          let removevideodetails: any;
          await manager.transaction(async (transactionalEntityManager) => {
            removevideodetails = await transactionalEntityManager
              .createQueryBuilder(Media, "Media")
              .delete()
              .from(Media)
              .where("id = :id", { id: id })
              .execute()
          })
          return removevideodetails;
        }
      }

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }


  public async SearchVideo(
    search_key?: string,
  ): Promise<any> {
    try {
      let result: any;
      // filter = filter?.toLocaleLowerCase();
      // if (filter == "subscription-due") {
      //   result = await this.subscriptionPaymentdueFilter();
      // } else if (filter == "paid-user") {
      //   result = await this.paidUsersListFilter();
      // } else if (filter == "subscription-expire") {
      //   result = await this.subscriptionExpiredOrDiscontinuedUsers();
      // } else if (filter == "active-users-since") {
      //   result = await this.userTotalJoinedPeriod();
      // } else if (filter == "contract-deployed-users") {
      //   result = await this.contractDeployedUserList();
      // } else if (filter == "api-balance-remain") {
      //   result = await this.sortingOfUserListAccordingToApiBalance();
      // } else {
      //   let len: number = search_key.length;
      //   this.logger.debug(`fetching  all users`);
      //   const manager = await this.getDataSourceManager();
      //   const query = await manager
      //     .createQueryBuilder(PartnersLogin, "partnerLogin")
      //     .leftJoinAndSelect("partnerLogin.partnerProfile", "partnerProfile")
      //     .leftJoinAndSelect(
      //       "partnerLogin.partnerBillingDetails",
      //       "partnerBillingDetails"
      //     )
      //     .select([
      //       `partnerBillingDetails.fullName as "fullName"`,
      //       `partnerLogin.username as username`,
      //       `partnerBillingDetails.address as address`,
      //       `partnerProfile.contactNo  as "contactNo"`,
      //       `partnerLogin.isActive as "isActive"`,
      //       `partnerLogin.isBlocked as "isBlocked"`,
      //       `partnerLogin.profileId as "profileId"`,
      //       `partnerLogin.createdAt  as "createdAt"`,
      //       `COUNT(*) OVER() as total_count`,
      //     ])
      //     .orderBy("partnerBillingDetails.fullName");
      //   let result = await query.getRawMany();
      //   let userdata = [];
      //   this.logger.debug(JSON.stringify(result));
      //   if (search_key && len >= 3) {
      //     for (let i = 0; i < result.length; i++) {
      //       if (
      //         result[i].username
      //           .toLowerCase()
      //           .includes(search_key.toLowerCase())
      //       ) {
      //         userdata.push({
      //           fullName: result[i].fullName,
      //           username: result[i].username,
      //           address: result[i].address,
      //           contactNo: result[i].contactNo,
      //           isActive: result[i].isActive,
      //           isBlocked: result[i].isBlocked,
      //           profileId: result[i].profileId,
      //           createdAt: result[i].createdAt,
      //         });
      //       } else {
      //         let search_k = search_key.toLowerCase();
      //         let data_k = result[i].fullName.toLowerCase();
      //         if (data_k.includes(search_k)) {
      //           userdata.push({
      //             fullName: result[i].fullName,
      //             username: result[i].username,
      //             address: result[i].address,
      //             contactNo: result[i].contactNo,
      //             isActive: result[i].isActive,
      //             isBlocked: result[i].isBlocked,
      //             profileId: result[i].profileId,
      //             createdAt: result[i].createdAt,
      //           });
      //         }
      //       }
      //     }
      //   }
      //   if (userdata == null || JSON.stringify(userdata) == "[]") return [];
      //   if (page_size && page_number)
      //     userdata = userdata.splice((page_number - 1) * page_size, page_size);
      //   this.logger.debug(`returning result`);
      //   this.logger.debug(JSON.stringify(userdata));
      //   return userdata;
      // }
      const manager = await this.getDataSourceManager();
      result = await manager
        .createQueryBuilder(Media, "media")
        .select()
        .where("media.isActive = :active", { active: true })
        .andWhere("media.isDeleted = :deleted", { deleted: false })
        .getMany();
      let len: number = search_key.length;
      let videoContent = [];
      if (search_key && len >= 3) {
        for (let i = 0; i < result.length; i++) {
          if (
            result[i]?.video_type
              ?.toLowerCase()
              .includes(search_key?.toLowerCase()) || result[i]?.video_name
                ?.toLowerCase()
                .includes(search_key?.toLowerCase())
          ) {
            videoContent.push({
              videoUrl: result[i].videoUrl,
              video_name: result[i].video_name,
              video_type: result[i].video_type,
            })
          }
        }
      }

      if (videoContent == null || JSON.stringify(videoContent) == "[]") return [];
      return videoContent;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

