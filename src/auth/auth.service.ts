import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwt: JwtService
	) {}

	async login(dto: AuthDto) {
		const { password, ...user } = await this.validateUser(dto)
	}

	async validateUser(dto: AuthDto) {
		const user = await this.usersService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(dto.email, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password.')

		return user
	}

	private issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}
}
