import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendshipService } from './friendship.service';
import { CreateFriendRequestDto, UpdateFriendStatusDto } from './dto/friendship.dto';

@Controller('friends')
@UseGuards(AuthGuard('jwt'))
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post('request')
  sendRequest(@Body() dto: CreateFriendRequestDto) {
    return this.friendshipService.sendRequest(dto);
  }

  @Patch(':id/respond')
  respondRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFriendStatusDto,
  ) {
    return this.friendshipService.respondRequest(id, dto);
  }

  @Get(':userId')
  getFriends(@Param('userId', ParseIntPipe) userId: number) {
    return this.friendshipService.getFriends(userId);
  }

  @Get(':userId/pending')
  getPendingRequests(@Param('userId', ParseIntPipe) userId: number) {
    return this.friendshipService.getPendingRequests(userId);
  }
}
