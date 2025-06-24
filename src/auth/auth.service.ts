import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  async login(dto: AuthDto) {
    const { password, ...user } = await this.validateUser(dto);
  }
}
