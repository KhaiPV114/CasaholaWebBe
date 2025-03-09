import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Socket } from "socket.io";

@Injectable()
export class SocketAuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient(); 
    const token = client.handshake.auth?.token || client.handshake.headers?.authorization;

    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      const user = await this.jwtService.verify(token);
      (client as any).userId = user.userId; 
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
