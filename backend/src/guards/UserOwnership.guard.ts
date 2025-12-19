import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    BadRequestException,
} from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';

export const USER_OWNERSHIP_KEY = 'userOwnership';

// Agora recebe o nome do serviço e método para buscar o recurso
export const UserOwnership = (options: {
    service: string;
    method: string;
    paramName?: string;
}) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        Reflect.defineMetadata(USER_OWNERSHIP_KEY, options, descriptor.value);
        return descriptor;
    };
};

@Injectable()
export class UserOwnershipGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private moduleRef: ModuleRef,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authenticatedUser = request.user;

        if (!authenticatedUser || !authenticatedUser.id) {
            throw new ForbiddenException('Usuário não autenticado');
        }

        const handler = context.getHandler();
        const options = this.reflector.get<{
            service: string;
            method: string;
            paramName?: string;
        }>(USER_OWNERSHIP_KEY, handler);

        // Se não tem options, não precisa validar ownership (ex: POST)
        if (!options) {
            return true;
        }

        const paramName = options.paramName || 'id';
        const resourceId = request.params[paramName];

        if (!resourceId) {
            throw new BadRequestException(
                `Parâmetro '${paramName}' não encontrado na rota`,
            );
        }

        // Busca o serviço dinamicamente
        const service = this.moduleRef.get(options.service, { strict: false });

        if (!service || !service[options.method]) {
            throw new BadRequestException(
                `Serviço ou método não encontrado: ${options.service}.${options.method}`,
            );
        }

        // Busca o recurso
        const resource = await service[options.method](resourceId);

        if (!resource) {
            throw new ForbiddenException('Recurso não encontrado');
        }

        // Verifica se o usuário autenticado é o dono do recurso
        if (resource.userId !== authenticatedUser.id) {
            throw new ForbiddenException(
                'Você não tem permissão para acessar este recurso',
            );
        }

        return true;
    }
}