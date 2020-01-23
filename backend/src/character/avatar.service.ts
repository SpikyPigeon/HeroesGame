import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {AvatarEntity} from "./avatar.entity";

@Injectable()
export class AvatarService {
	constructor(
		@Inject("AVATAR_REPOSITORY")
		private readonly avatars: Repository<AvatarEntity>,
	) {
	}
}
