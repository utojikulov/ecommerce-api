import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@IsEmail()
	@IsNotEmpty()
	email: string

	@MinLength(6, {
		message: 'Password must contain more than 6 characters.'
	})
	@IsNotEmpty()
	@IsString()
	password: string
}
