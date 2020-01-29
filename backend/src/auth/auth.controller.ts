import {ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, HttpException, HttpStatus, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LoginDefinition, LoginResponse, PasswordChangeDefinition} from "./auth.dto";
import {UserEntity, UserRequest} from "../user";
import {AuthService} from "./auth.service";

@ApiTags("auth")
@Controller()
export class AuthController {
	constructor(private readonly auth: AuthService) {
	}

	@ApiBody({type: LoginDefinition})
	@UseGuards(AuthGuard("local"))
	@Post("login")
	@ApiOkResponse({description: "User is now logged in", type: LoginResponse})
	@ApiForbiddenResponse({description: "Login information are incorrect"})
	async login(@UserRequest() user: UserEntity): Promise<LoginResponse> {
		return this.auth.login(user);
	}

	@UseGuards(AuthGuard("jwt"))
	@ApiBearerAuth()
	@Post("passwd")
	@ApiOkResponse({description: "Password is changed"})
	@ApiForbiddenResponse({description: "Token expired or token is invalid"})
	async changePassword(@UserRequest() user: UserEntity, @Body() data: PasswordChangeDefinition) {
		try {
			await this.auth.changePassword(user.id, data.oldPass, data.newPass);
			return {
				status: "Password changed"
			};
		} catch (e) {
			throw new HttpException(e, HttpStatus.FORBIDDEN);
		}
	}
}
