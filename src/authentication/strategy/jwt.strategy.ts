import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../services/user.service";
import { AuthenticationTokenPayloadDto } from "../dto/payload.dto";
import { User } from "src/Models/user.model";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    });
  }

  async validate(payload: AuthenticationTokenPayloadDto) {
    let user: User;
    try {
      const email = payload.email;
      user = await this.userRepository.findByEmail(email);
    } catch (error) {
      throw new UnauthorizedException(
        "You are not Authorized to do this action"
      );
    }
    return user;
  }
}
