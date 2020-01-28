import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {StructureEntity} from "./structure.entity";
import {SquareService} from "../square.service";
import {StructureType} from "heroes-common";
import {ShopEntity} from "../shop";

interface UpdateStructureInfo{
	worldId: number,
	x: number,
	y: number,
	name: string,
	description: string,
	type: StructureType,
	shop: ShopEntity,
}

@Injectable()
export class StructureService {
	constructor(
		@Inject("STRUCTURE_REPOSITORY")
		private readonly structures: Repository<StructureEntity>,
		private readonly squares: SquareService,
	) {
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

	async findAll(): Promise<StructureEntity[]> {
		return await this.structures.find();
	}

	async findOne(structureId: number): Promise<StructureEntity> {
		return await this.structures.findOneOrFail({where: {structureId}});
	}

	async update(id: number, newStructure: Partial<UpdateStructureInfo>): Promise<StructureEntity>{
		const structure = await this.findOne(id);
		if(newStructure.worldId && newStructure.x && newStructure.y){
			structure.square = await this.squares.findOne(newStructure.worldId, newStructure.x, newStructure.y);
		}
		if(newStructure.name){
			structure.name = newStructure.name;
		}
		if(newStructure.description){
			structure.description = newStructure.description;
		}
		if(newStructure.type){
			structure.type = newStructure.type;
		}
		if(newStructure.shop){
			structure.shop = newStructure.shop;
		}
		return await this.structures.save(structure);
	}
	
}
