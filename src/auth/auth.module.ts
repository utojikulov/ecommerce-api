import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from 'src/config/jwt.config'

@Module({
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
