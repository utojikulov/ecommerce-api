import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

class JwtStrategy extends PassportStrategy(Strategy) {}
