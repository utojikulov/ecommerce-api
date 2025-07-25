import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { PrismaService } from 'src/prisma.service'

@Module({
	// controllers: [UserController]
	providers: [UserService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
