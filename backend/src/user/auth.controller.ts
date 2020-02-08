import {ApiBearerAuth, ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, HttpException, HttpStatus, Logger, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LoginInfoDto, LoginResponseDto, PasswordChangeInfoDto} from "./auth.dto";
import {UserRequest} from "./user.decorator";
import {AuthService} from "./auth.service";
import {UserEntity} from "./user.entity";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	private readonly logger: Logger = new Logger(AuthController.name);

	constructor(private readonly auth: AuthService) {
	}

	@ApiOkResponse({description: "User is now logged in", type: LoginResponseDto})
	@ApiForbiddenResponse({description: "Login information are incorrect"})
	@ApiBody({type: LoginInfoDto})
	@UseGuards(AuthGuard("local"))
	@Post()
	async login(@UserRequest() user: UserEntity): Promise<LoginResponseDto> {
		this.logger.log(`login`);
		return this.auth.login(user);
	}

	@ApiBearerAuth()
	@ApiOkResponse({description: "Password is changed"})
	@ApiForbiddenResponse({description: "Token expired or token is invalid"})
	@ApiBody({type: PasswordChangeInfoDto})
	@UseGuards(AuthGuard("jwt"))
	@Post("passwd")
	async changePassword(@UserRequest() user: UserEntity, @Body() data: PasswordChangeInfoDto) {
		this.logger.log(`changePassword`);
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
