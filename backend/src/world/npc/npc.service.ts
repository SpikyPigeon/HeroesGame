import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {NpcEntity} from "./npc.entity";
import {SquareService} from "../square.service";

interface UpdateNpcInfo {
	worldId: number,
	x: number,
	y: number,
	name: string,
	description: string,
}

@Injectable()
export class NpcService {
	constructor(
		@Inject("NPC_REPOSITORY")
		private readonly npcs: Repository<NpcEntity>,
		private readonly squares: SquareService,
	) {
	}

	async create(worldId: number, x: number, y: number, name: string, description: string): Promise<NpcEntity> {
		const npc = await this.npcs.save(this.npcs.create({
			square: await this.squares.findOne(worldId, x, y),
			name,
			description,
		}));
		await this.npcs.create(npc);
		return npc;
	}

	async findAll(): Promise<NpcEntity[]> {
		return await this.npcs.find();
	}

	async findOne(id: number): Promise<NpcEntity> {
		return await this.npcs.findOneOrFail({where: {id}});
	}

	async update(id: number, newNpc: Partial<UpdateNpcInfo>): Promise<NpcEntity> {
		const npc = await this.findOne(id);
		if (newNpc.worldId && newNpc.x && newNpc.y) {
			npc.square = await this.squares.findOne(newNpc.worldId, newNpc.x, newNpc.y);
		}
		if (newNpc.name) {
			npc.name = newNpc.name;
		}
		if (newNpc.description) {
			npc.description = newNpc.description;
		}
		return await this.npcs.save(npc);
	}

}
