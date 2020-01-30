import {ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, HttpException, HttpStatus, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LoginDefinition, LoginResponse, PasswordChangeDefinition} from "./auth.dto";
import {UserRequest} from "./user.decorator";
import {AuthService} from "./auth.service";
import {UserEntity} from "./user.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly auth: AuthService) {
	}

	@ApiOkResponse({description: "User is now logged in", type: LoginResponse})
	@ApiForbiddenResponse({description: "Login information are incorrect"})
	@ApiBody({type: LoginDefinition})
	@UseGuards(AuthGuard("local"))
	@Post()
	async login(@UserRequest() user: UserEntity): Promise<LoginResponse> {
		return this.auth.login(user);
	}

	@ApiBearerAuth()
	@ApiOkResponse({description: "Password is changed"})
	@ApiForbiddenResponse({description: "Token expired or token is invalid"})
	@ApiBody({type: PasswordChangeDefinition})
	@UseGuards(AuthGuard("jwt"))
	@Post("passwd")
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
