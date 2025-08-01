import { applyDecorators, UseGuards } from "@nestjs/common"
import { typeRole } from '../../common/role.enum'
import { AuthGuard } from '../guard/auth.guard'
import { RolesGuard } from '../guard/roles.guard'
import { Roles } from "./roles.decorator"

export const Auth = (role: typeRole) => {
    return applyDecorators(
        Roles(role),
        UseGuards(AuthGuard, RolesGuard)
    )
}