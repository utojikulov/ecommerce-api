import { BadRequestException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'


@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password)
		}
		return this.prisma.user.create({
			data: user
		})
	}

  async update(id: string, dto: AuthDto) {
    const data = dto
    if (!dto) throw new BadRequestException('nothing was provided to upate')

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password)}
    } 

    return this.prisma.user.update({
      where: {
        id
      },
      data,
      select: {
        email: true,
        name: true
      }
    })
  }
}
