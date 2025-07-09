import { Injectable } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private userService: UserService
	) {
		const jwtSecret = configService.get('JWT_SECRET')
		if (!jwtSecret) {
			throw new Error('jwt secret not defined')
		}

		const jwtOptions = {
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: jwtSecret
		}
		super(jwtOptions)
	}

	async validate({ id }: { id: string }) {
		return this.userService.getById(id)
	}
}
