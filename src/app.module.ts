import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OwnerModule } from './owner/owner.module';
import { WebsiteModule } from './website/website.module';
import { AppController } from './app.controller';
import { AppService } from './App.service';
import { LetterModule } from './letter/letter.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthMiddleware } from './auth.middleware';
import { WebsiteController } from './website/website.controller';
import { OwnerController } from './owner/owner.controller';
import { LetterController } from './letter/letter.controller';



@Module({
  imports: [WebsiteModule, OwnerModule, LetterModule, UserModule, PrismaModule,],
  controllers: [AppController, UserController],
  providers: [AppService, UserService,],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware) 
      .forRoutes(WebsiteController, OwnerController, LetterController);
  }
}


  

