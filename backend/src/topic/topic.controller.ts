import { Controller, Post, Get, Param, Query, Body, UseGuards } from '@nestjs/common';
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
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.topicsService.findAll(Number(page), Number(limit));
    }

    @Post('add-course')
    @UseGuards(AuthGuard('jwt'))
    addCourseToTopic(@Body() dto: AddCourseToTopicDto) {
        return this.topicsService.addCourseToTopic(dto);
    }

    @Get(':slug/courses')
    findCoursesByTopic(
        @Param('slug') slug: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.topicsService.findCoursesByTopic(slug, Number(page), Number(limit));
    }
}
