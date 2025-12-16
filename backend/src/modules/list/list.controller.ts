import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateListDto, UpdateListDto } from './dto/list.dto';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';
import { User } from '../users/decorators/user.decorator';
import type { User as PrismaUser } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Post()
    create(@Body() createListDto: CreateListDto, @User() user: PrismaUser) {
        return this.listService.create(createListDto, user.id);
    }

    @Get()
    findAll(@User() user: PrismaUser) {
        return this.listService.findAll(user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @User() user: PrismaUser) {
        return this.listService.findOne(id, user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListDto: UpdateListDto, @User() user: PrismaUser) {
        return this.listService.update(id, updateListDto, user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @User() user: PrismaUser) {
        return this.listService.remove(id, user.id);
    }
}