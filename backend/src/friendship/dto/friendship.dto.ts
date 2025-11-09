import { IsInt, IsEnum } from 'class-validator';
import { FriendshipStatus } from '@prisma/client';

export class CreateFriendRequestDto {
  @IsInt()
  requesterId: string;

  @IsInt()
  addresseeId: string;
}

export class UpdateFriendStatusDto {
  @IsEnum(FriendshipStatus)
  status: FriendshipStatus;
}
