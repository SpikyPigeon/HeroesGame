import {CanActivate, ExecutionContext, Injectable, Logger} from "@nestjs/common";
import {Request} from "express";
import {UserEntity} from "../user";

@Injectable()
export class AdminGuard implements CanActivate {
	private readonly logger: Logger = new Logger(AdminGuard.name);

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();
		const user = request.user as UserEntity;

		if (user && user.isAdmin) {
			this.logger.log("User is admin, accepting");
			return true;
		} else {
			this.logger.log("User is not admin, refusing");
			return false;
		}
	}
}
