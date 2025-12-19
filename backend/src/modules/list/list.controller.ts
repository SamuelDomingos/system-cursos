import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateListDto, UpdateListDto } from './dto/list.dto';
import { UserOwnershipGuard } from 'src/guards/UserOwnership.guard';

@Controller('list')
@UseGuards(AuthGuard('jwt'), UserOwnershipGuard)
export class ListController {
    constructor(private readonly listService: ListService) { }

    @Post()
    create(@Body() createListDto: CreateListDto, @Req() req: any) {
        return this.listService.create(createListDto, req.user.id);
    }

    @Get()
    findAll(@Req() req: any) {
        return this.listService.findAll(req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.listService.findOne(id, req.user.id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateListDto: UpdateListDto, @Req() req: any) {
        return this.listService.update(id, updateListDto, req.user.id);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.listService.remove(id, req.user.id);
    }
}