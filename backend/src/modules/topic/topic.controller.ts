import { Controller, Post, Get, Query, Body, UseGuards } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto, AddCourseToTopicDto } from './dto/topic.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('topics')
export class TopicController {
    constructor(private readonly topicsService: TopicService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() dto: CreateTopicDto) {
        return this.topicsService.create(dto);
    }

    @Get()
    findAll(
        @Query('page') topicPage = 1,
        @Query('limit') topicLimit = 10,
        @Query('coursePage') coursePage?: number,
        @Query('courseLimit') courseLimit?: number,
    ) {
        return this.topicsService.findAll(Number(topicPage), Number(topicLimit), Number(coursePage), Number(courseLimit));
    }

    @Post('add-course')
    @UseGuards(AuthGuard('jwt'))
    addCourseToTopic(@Body() dto: AddCourseToTopicDto) {
        return this.topicsService.addCourseToTopic(dto);
    }
}