import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as crypto from 'crypto-js';
// import * as Mail from 'nodemailer/lib/mailer';
//import { createTransport } from 'nodemailer';

@Injectable()
export class Base {
//   private nodemailerTransport: Mail;
//   @Inject()
//   protected readonly logger: CustomLoggerService;

  @InjectDataSource('default')
  defaultDataSource: DataSource;

//   constructor() {
//     this.nodemailerTransport = createTransport({
//       service: process.env.EMAIL_SERVICE,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }

  // add this method to get the proper Manager from the DataSource to run transactions
  protected async getDataSourceManager(): Promise<EntityManager> {
   // this.logger.log('Getting datasource manager');
   // this.logger.debug(this.defaultDataSource.options['username']);
    return this.defaultDataSource.manager;
  }

//   protected async generateApiKeyForUser(): Promise<string> {
//     this.logger.debug('Generating api key for user');
//     let result = '';
//     const length = 28;
//     const chars = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]\/`;
//     for (let i = length; i > 0; --i) {
//       result += chars[Math.floor(Math.random() * chars.length)];
//     }
//     this.logger.debug(JSON.stringify(result), `generated apikey`);
//     return result;
//   }

//   protected async maskGeneratedApiKeyOfUser(apiKey: string): Promise<string> {
//     const key = process.env.CIPHER_SECRET.toString();
//     const text = apiKey;
//     this.logger.debug('Masking api key for user');
//     const encrypted = await crypto.AES.encrypt(text, key).toString();
//     this.logger.debug(JSON.stringify(encrypted));
//     return encrypted;
//   }

//   protected async decipherApiKeyOfUser(apiKey: string): Promise<string> {
//     const key = process.env.CIPHER_SECRET.toString();
//     const encrypted = apiKey;
//     this.logger.debug('Deciphering api key for user', apiKey);
//     const decipher = crypto.AES.decrypt(apiKey, key);
//     const decrypted = decipher.toString(crypto.enc.Utf8);
//     this.logger.debug(JSON.stringify(decrypted));
//     return decrypted;
//   }

//   protected async sendMail(options: Mail.Options) {
//     this.logger.debug(`Sending mail`);
//     return await this.nodemailerTransport.sendMail(options);
//   }
}
