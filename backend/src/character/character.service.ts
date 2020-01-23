import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {CharacterEntity} from "./character.entity";
import {EquipmentEntity} from "./equipment.entity";
import {AvatarEntity} from "./avatar.entity";

@Injectable()
export class CharacterService {
	constructor(
		@Inject("CHARACTER_REPOSITORY")
		private readonly characters: Repository<CharacterEntity>,
		@Inject("EQUIPMENT_REPOSITORY")
		private readonly equipments: Repository<EquipmentEntity>,
		@Inject("AVATAR_REPOSITORY")
		private readonly avatars: Repository<AvatarEntity>,
	) {
	}
}
