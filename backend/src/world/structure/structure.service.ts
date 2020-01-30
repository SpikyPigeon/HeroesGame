import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";
import {Repository} from "typeorm";
import {CreateStructureInfo} from "./structure.dto";
import {StructureEntity} from "./structure.entity";
import {SquareService} from "../square.service";
import {StructureType} from "heroes-common";

@Injectable()
export class StructureService implements OnModuleInit {
	private squares!: SquareService;

	constructor(
		@Inject("STRUCTURE_REPOSITORY")
		private readonly structures: Repository<StructureEntity>,
		private readonly refs: ModuleRef,
	) {
	}

	onModuleInit() {
		this.squares = this.refs.get(SquareService, {strict: false});
	}

	async findAll(): Promise<Array<StructureEntity>> {
		return await this.structures.find();
	}

	async findOne(structureId: number): Promise<StructureEntity> {
		return await this.structures.findOneOrFail({where: {structureId}});
	}

	async create(worldId: number, x: number, y: number, name: string, description: string, type: StructureType): Promise<StructureEntity> {
		const structure = await this.structures.save(this.structures.create({
			square: await this.squares.findOne(worldId, x, y),
			name,
			description,
			type,
		}));
		await this.structures.create(structure);
		return structure;
	}

	async update(id: number, newStructure: Partial<CreateStructureInfo>): Promise<StructureEntity> {
		const structure = await this.findOne(id);
		if (newStructure.worldId && newStructure.x && newStructure.y) {
			structure.square = await this.squares.findOne(newStructure.worldId, newStructure.x, newStructure.y);
		}
		if (newStructure.name) {
			structure.name = newStructure.name;
		}
		if (newStructure.description) {
			structure.description = newStructure.description;
		}
		if (newStructure.type) {
			structure.type = newStructure.type;
		}
		return await this.structures.save(structure);
	}
}
