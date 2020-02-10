import {ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Logger, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateUserInfoDto, ModifyUserProfileDto} from "./user.dto";
import {UserRequest} from "./user.decorator";
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";

@ApiTags("user")
@Controller()
export class UserController {
	private readonly logger: Logger = new Logger(UserController.name);

	constructor(private readonly users: UserService) {
	}

	@ApiCreatedResponse({type: UserEntity})
	@Post()
	async register(@Body() data: CreateUserInfoDto): Promise<UserEntity> {
		this.logger.log(`register`);
		return await this.users.create(data.email, data.password, data.firstName, data.lastName);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: UserEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	async currentUser(@UserRequest() user: UserEntity): Promise<UserEntity> {
		this.logger.log(`currentUser`);
		return user;
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: UserEntity})
	@ApiBody({type: ModifyUserProfileDto})
	@UseGuards(AuthGuard("jwt"))
	@Put("me")
	async changeProfile(@UserRequest() user: UserEntity, @Body() data: Partial<ModifyUserProfileDto>): Promise<UserEntity> {
		this.logger.log(`changeProfile`);
		return await this.users.changeProfile(user.id, data);
	}
}
