
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { typeRole } from '../../common/role.enum'
const ROLE_KEY = 'roles'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly refletor: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.refletor.getAllAndOverride<typeRole>(ROLE_KEY, [context.getHandler(), context.getClass()])
    if (!requiredRoles) return false
    const { user } = context.switchToHttp().getRequest()
    if (user.role === typeRole.ADMIN) return true
    return user.role == requiredRoles
  }
}
