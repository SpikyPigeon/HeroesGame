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

	async findAll(): Promise<Array<AvatarEntity>> {
		return await this.avatars.find();
	}

	async findOne(id: number): Promise<AvatarEntity> {
		return await this.avatars.findOneOrFail(id);
	}

	async create(filename: string): Promise<AvatarEntity> {
		return await this.avatars.save(this.avatars.create({filename}));
	}
}
