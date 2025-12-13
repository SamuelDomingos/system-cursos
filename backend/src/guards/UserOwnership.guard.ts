import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const USER_OWNERSHIP_KEY = 'userOwnership';

export const UserOwnership = (paramName: string = 'id') => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(USER_OWNERSHIP_KEY, paramName, descriptor.value);
        return descriptor;
    };
};

@Injectable()
export class UserOwnershipGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();

        const authenticatedUser = request.user;

        if (!authenticatedUser || !authenticatedUser.id) {
            throw new ForbiddenException('Usuário não autenticado');
        }

        const handler = context.getHandler();
        const paramName = this.reflector.get<string>(
            USER_OWNERSHIP_KEY,
            handler,
        ) || 'id';

        const resourceUserId = request.params[paramName];

        if (!resourceUserId) {
            throw new BadRequestException(
                `Parâmetro '${paramName}' não encontrado na rota`,
            );
        }

        if (authenticatedUser.id !== resourceUserId) {
            throw new ForbiddenException(
                'Você não tem permissão para acessar este recurso',
            );
        }

        return true;
    }
}