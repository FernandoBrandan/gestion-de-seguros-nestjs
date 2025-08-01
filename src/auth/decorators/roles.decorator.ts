import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common'

// export const Roles = createParamDecorator(
// (data: unknown, ctx: ExecutionContext) => {
// const request = ctx.switchToHttp().getRequest()
// return request.user
// },
// )

import { typeRole } from '../../common/role.enum'

export const Roles = (roles: typeRole) => SetMetadata("roles", roles)