import { Controller, Get, Param, Delete, Patch, Body, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query() query: PaginationDto) {
    return this.usersService.findAll(query);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { email?: string; name?: string; password?: string },
  ) {
    return this.usersService.update(id, body.email || '', body.name || '', body.password || '');
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.delete(id);
    return { message: 'Usuário removido com sucesso' };
  }
}
