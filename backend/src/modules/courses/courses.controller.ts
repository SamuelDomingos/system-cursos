import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CoursesService } from './courses.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCourseDto, UpdateCourseDto } from './dto/courses.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { multerConfig } from 'src/config/multer.config';
import { UserOwnership } from 'src/guards/UserOwnership.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  @UseGuards(AuthGuard('jwt'))
  @UserOwnership('userId')
  create(@Body() createCourseDto: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,) {
    const thumbnailUrl = `/uploads/${file.filename}`;

    return this.coursesService.create({
      ...createCourseDto,
      thumbnail: thumbnailUrl,
    });
  }

  @Get()
  findAll(@Query() query: PaginationDto) {
    return this.coursesService.findAll(query);
  }

  @Get(':userId/watch/:courseId')
  @UserOwnership('userId')
  findUserAvailableCourse(
    @Param('userId') userId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.coursesService.findUserAvailableCourse(userId, courseId);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  @UseGuards(AuthGuard('jwt'))
  @UserOwnership('userId')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const thumbnailUrl = file ? `/uploads/${file.filename}` : undefined;
    return this.coursesService.update(id, {
      ...updateCourseDto,
      thumbnail: thumbnailUrl,
    });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UserOwnership('userId')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
