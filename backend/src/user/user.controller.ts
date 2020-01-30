import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Post, Put, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {CreateUserInfoDto, ModifyUserProfileDto} from "./user.dto";
import {UserRequest} from "./user.decorator";
import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";

@ApiTags("user")
@Controller()
export class UserController {
	constructor(private readonly users: UserService) {
	}

	@ApiCreatedResponse({type: UserEntity})
	@Post()
	async register(@Body() data: CreateUserInfoDto): Promise<UserEntity> {
		return await this.users.create(data.email, data.password, data.firstName, data.lastName);
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: UserEntity})
	@UseGuards(AuthGuard("jwt"))
	@Get("me")
	async currentUser(@UserRequest() user: UserEntity): Promise<UserEntity> {
		return user;
	}

	@ApiBearerAuth()
	@ApiOkResponse({type: UserEntity})
	@UseGuards(AuthGuard("jwt"))
	@Put("me")
	async changeProfile(@UserRequest() user: UserEntity, @Body() data: ModifyUserProfileDto): Promise<UserEntity> {
		return await this.users.changeProfile(user.id, data.firstName, data.lastName, data.email);
	}
}
