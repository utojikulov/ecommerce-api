import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		return await this.authService.login(dto)
	}

	// @Post('register')
	// async register(
	// 	@Body() dto: AuthDto,
	// 	@Res({ passthrough: true }) res: Response
	// ) {
	// 	return await this.authService.register()
	// }

	// 'login/access-token'
	//
	// 'logout'
}
