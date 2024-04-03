import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationController } from './notification/notification.controller';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './config';
@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(Config.mongodbUrl, {
      dbName: Config.mongodbName,
    }),
  ],
  controllers: [AppController, NotificationController],
  providers: [AppService],
})
export class AppModule {}
