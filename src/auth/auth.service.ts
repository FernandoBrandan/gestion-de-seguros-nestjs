import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
// import { SignupDto } from './dto/signup.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { SigninDto } from './dto/signin.dto'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwt: JwtService
    ) { }

    async signup(dto: CreateUserDto) {
        const existingUser = await this.usersService.findByEmail(dto.email)
        if (existingUser) throw new ConflictException("User already exists")

        const hash = await bcrypt.hash(dto.password, 10)
        const user = await this.usersService.create({
            ...dto,
            password: hash,
        })

        return this.signToken(user._id, user.email, user.role)
    }

    async signin(dto: SigninDto) {
        const user = await this.usersService.findByEmailWithPassword(dto.email)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        const isPasswordValid = await bcrypt.compare(dto.password, user.password)
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

        return this.signToken(user._id, user.email, user.role)
    }

    private signToken(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role }
        const token = this.jwt.sign(payload)
        return { access_token: token }
    }
}
