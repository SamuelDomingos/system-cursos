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

@Module({
  imports: [CoursesModule, AuthModule, UsersModule, ConfigModule.forRoot(), PrismaModule, MulterModule.register({
    dest: './uploads',
  }),
  ],
  controllers: [ModulesController, LessonsController, EnrollmentsController, ProgressController],
  providers: [ModulesService, LessonsService, EnrollmentsService, ProgressService],
})
export class AppModule { }
