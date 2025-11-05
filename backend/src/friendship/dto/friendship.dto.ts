import { IsInt, IsEnum } from 'class-validator';
import { FriendshipStatus } from '@prisma/client';

export class CreateFriendRequestDto {
  @IsInt()
  requesterId: number;

  @IsInt()
  addresseeId: number;
}

export class UpdateFriendStatusDto {
  @IsEnum(FriendshipStatus)
  status: FriendshipStatus;
}
