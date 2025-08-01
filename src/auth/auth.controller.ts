import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'
// import { SignupDto } from './dto/signup.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { SigninDto } from './dto/signin.dto'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() dto: CreateUserDto) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signin(@Body() dto: SigninDto) {
        return this.authService.signin(dto)
    }
}
