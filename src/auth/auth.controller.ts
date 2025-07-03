import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	// @Post('login')
	// async login(
	// 	@Body() dto: AuthDto,
	// 	@Response({ passthrough: true }) res: Response
	// ) {
	// 	return await this.authService.login(dto, res)
	// }
}
