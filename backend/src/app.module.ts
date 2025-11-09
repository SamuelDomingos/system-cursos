import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ModulesController } from './modules/modules.controller';
import { ModulesService } from './modules/modules.service';
import { LessonsService } from './lessons/lessons.service';
import { LessonsController } from './lessons/lessons.controller';
import { EnrollmentsController } from './enrollments/enrollments.controller';
import { EnrollmentsService } from './enrollments/enrollments.service';
import { ProgressService } from './progress/progress.service';
import { ProgressController } from './progress/progress.controller';
import { MulterModule } from '@nestjs/platform-express';
import { FriendshipController } from './friendship/friendship.controller';
import { FriendshipService } from './friendship/friendship.service';
import { FriendshipModule } from './friendship/friendship.module';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [CoursesModule, AuthModule, UsersModule, ConfigModule.forRoot(), PrismaModule, MulterModule.register({
    dest: './uploads',
  }), FriendshipModule, TopicModule,
  ],
  controllers: [ModulesController, LessonsController, EnrollmentsController, ProgressController, FriendshipController],
  providers: [ModulesService, LessonsService, EnrollmentsService, ProgressService, FriendshipService],
})
export class AppModule { }
