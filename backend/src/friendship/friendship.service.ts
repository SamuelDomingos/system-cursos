import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFriendRequestDto, UpdateFriendStatusDto } from './dto/friendship.dto';
import { FriendshipStatus } from '@prisma/client';

@Injectable()
export class FriendshipService {
    constructor(private prisma: PrismaService) { }

    async sendRequest(dto: CreateFriendRequestDto) {
        const { requesterId, addresseeId } = dto;

        if (requesterId === addresseeId) {
            throw new ConflictException('Você não pode se adicionar como amigo');
        }

        const existing = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requesterId, addresseeId },
                    { requesterId: addresseeId, addresseeId: requesterId },
                ],
            },
        });

        if (existing) throw new ConflictException('Já existe uma solicitação entre esses usuários');

        return this.prisma.friendship.create({
            data: { requesterId, addresseeId },
        });
    }

    async respondRequest(friendshipId: number, dto: UpdateFriendStatusDto) {
        const friendship = await this.prisma.friendship.findUnique({
            where: { id: friendshipId },
        });

        if (!friendship) throw new NotFoundException('Solicitação de amizade não encontrada');

        return this.prisma.friendship.update({
            where: { id: friendshipId },
            data: { status: dto.status },
        });
    }

    async getFriends(userId: number) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { requesterId: userId, status: FriendshipStatus.ACCEPTED },
                    { addresseeId: userId, status: FriendshipStatus.ACCEPTED },
                ],
            },
            include: {
                requester: { select: { id: true, name: true, email: true } },
                addressee: { select: { id: true, name: true, email: true } },
            },
        });

        // Retornar lista dos amigos (independente de quem iniciou)
        return friendships.map(f =>
            f.requesterId === userId ? f.addressee : f.requester,
        );
    }

    async getPendingRequests(userId: number) {
        return this.prisma.friendship.findMany({
            where: { addresseeId: userId, status: FriendshipStatus.PENDING },
            include: { requester: { select: { id: true, name: true, email: true } } },
        });
    }

    async getFriendsRecentActivity(userId: number) {
        const friends = await this.getFriends(userId);

        return Promise.all(
            friends.map(async (friend) => {
                const lastProgress = await this.prisma.progress.findFirst({
                    where: { userId: friend.id },
                    include: {
                        lesson: {
                            include: {
                                module: { include: { course: true } },
                            },
                        },
                    },
                    orderBy: { updatedAt: 'desc' },
                });

                return {
                    friend: { id: friend.id, name: friend.name },
                    lastLesson: lastProgress
                        ? {
                            lessonTitle: lastProgress.lesson.title,
                            courseTitle: lastProgress.lesson.module.course.title,
                            updatedAt: lastProgress.updatedAt,
                        }
                        : null,
                };
            }),
        );
    }

}
