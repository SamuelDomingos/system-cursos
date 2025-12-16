import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentGuard } from 'src/guards/enrollment.guard';
import { CreateManyLessonsDto, UpdateLessonDto } from './dto/lessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() CreateManyLessonsDto: CreateManyLessonsDto) {
    return this.lessonsService.create(CreateManyLessonsDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), EnrollmentGuard)
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
