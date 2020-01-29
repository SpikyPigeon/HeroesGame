import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareService} from "../square.service";
import {NpcEntity} from "./npc.entity";
import {NpcInfo} from "./npc.dto";

@Injectable()
export class NpcService {
	constructor(
		@Inject("NPC_REPOSITORY")
		private readonly npcs: Repository<NpcEntity>,
		private readonly squares: SquareService,
	) {
	}

	async findAll(): Promise<Array<NpcEntity>> {
		return await this.npcs.find();
	}

	async findOne(id: number): Promise<NpcEntity> {
		return await this.npcs.findOneOrFail({where: {id}});
	}

	async create(worldId: number, x: number, y: number, name: string, description: string): Promise<NpcEntity> {
		return await this.npcs.save(this.npcs.create({
			square: await this.squares.findOne(worldId, x, y),
			name,
			description,
		}));
	}

	async update(id: number, info: Partial<NpcInfo>): Promise<NpcEntity> {
		const npc = await this.findOne(id);
		if (info.worldId && info.x && info.y) {
			npc.square = await this.squares.findOne(info.worldId, info.x, info.y);
		}
		if (info.name) {
			npc.name = info.name;
		}
		if (info.description) {
			npc.description = info.description;
		}
		return await this.npcs.save(npc);
	}
}
