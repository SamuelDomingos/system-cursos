import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ModulesController } from './modules/modules/modules.controller';
import { ModulesService } from './modules/modules/modules.service';
import { LessonsService } from './modules/lessons/lessons.service';
import { LessonsController } from './modules/lessons/lessons.controller';
import { EnrollmentsController } from './modules/enrollments/enrollments.controller';
import { EnrollmentsService } from './modules/enrollments/enrollments.service';
import { ProgressService } from './modules/progress/progress.service';
import { MulterModule } from '@nestjs/platform-express';
import { FriendshipController } from './modules/friendship/friendship.controller';
import { FriendshipService } from './modules/friendship/friendship.service';
import { FriendshipModule } from './modules/friendship/friendship.module';
import { TopicModule } from './modules/topic/topic.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ListController } from './modules/list/list.controller';
import { ListService } from './modules/list/list.service';
import { ListModule } from './modules/list/list.module';

@Module({
  imports: [CoursesModule, AuthModule, UsersModule, ConfigModule.forRoot(), PrismaModule, MulterModule.register({
    dest: './uploads',
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    FriendshipModule, TopicModule, StripeModule, ListModule,
  ],
  controllers: [ModulesController, LessonsController, EnrollmentsController, FriendshipController, ListController],
  providers: [ModulesService, LessonsService, EnrollmentsService, ProgressService, FriendshipService, ListService],
})
export class AppModule { }
