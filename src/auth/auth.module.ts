import { Module, forwardRef } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { UsersModule } from '../users/users.module'
import { AuthGuard } from './guard/auth.guard'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "top-secret",
      signOptions: { expiresIn: '1h' }
    }),
    forwardRef(() => UsersModule)
  ],
  controllers: [
    AuthController,
  ],
  providers: [AuthService, AuthGuard],
  exports: [JwtModule, AuthGuard, AuthService],
})
export class AuthModule { }
