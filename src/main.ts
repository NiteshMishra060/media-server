import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import bodyParser from "body-parser";
import helmet from "helmet";
//import { CustomLoggerService } from "./common/service/custom-logger.service";
//import { TimeoutInterceptor } from "./auth/interceptors/timeout.interceptor";
import { NestExpressApplication } from "@nestjs/platform-express";
//import * as cookieParser from "cookie-parser";
import { Options } from "@nestjs/common";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    //  origin: process.env.CORS_ORIGINS
    // ? process.env.CORS_ORIGINS.split(',')
    origin: true,
    methods: ["OPTIONS", "GET", "PUT", "POST", "DELETE", "PATCH"],
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type, Accept', // Allowed headers

  });
  //app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new TimeoutInterceptor());
  //app.use(cookieParser());
  app.setGlobalPrefix("api");

  const options = new DocumentBuilder()
    .setTitle("media server api")
    .setDescription("media server Api Documentation")
    .addServer("http://")
    .addServer("https://")
    .addBearerAuth()
    .addApiKey({
      name: "api-key",
      type: "apiKey",
    })
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup("api",app, document);
  //  app.use(bodyParser.json({ limit: "50mb" }));
  //  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  //  app.use(helmet());
  app.enableShutdownHooks();

  await app.listen(process.env.PORT);
}
bootstrap();
