import {
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
	REFRESH_TOKEN_EXPIRATION = 1
	REFRESH_TOKEN_NAME = 'refreshToken'
	constructor(
		private userService: UserService,
		private jwt: JwtService
	) {}

	async login(dto: AuthDto) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto)
		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	// async register() {}
	// async getNewTokens() {}

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

	async validateUser(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new NotFoundException('User not found')

		const isValid = await verify(dto.email, dto.password)

		if (!isValid) throw new UnauthorizedException('Invalid password.')

		return user
	}

	// addRefreshTokenToResponse(res: Response, refreshToken: string) {
	// 	const expiresIn = new Date()
	// 	expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRATION)
	// }
	//
	// removeRefreshTokenFromResponse() {}
}
