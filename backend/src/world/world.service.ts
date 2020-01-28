import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareService} from "./square.service";
import {WorldEntity} from "./world.entity";

@Injectable()
export class WorldService {
	constructor(
		@Inject("WORLD_REPOSITORY")
		private readonly worlds: Repository<WorldEntity>,
		private readonly squares: SquareService,
	) {
	}

	async create(name: string, limitX: number, limitY: number, color: string, bgImage: string): Promise<WorldEntity> {
		const world = await this.worlds.save(this.worlds.create({
			name,
			color,
			bgImage,
			limitX,
			limitY,
		}));

		await this.squares.create(world);
		return world;
	}

	async update(id: number, newName?: string, newImage?: string, newColor?: string): Promise<WorldEntity> {
		const world = await this.findOne(id);
		if (newName) {
			world.name = newName;
		}
		if (newImage) {
			world.bgImage = newImage;
		}
		if (newColor) {
			world.color = newColor;
		}
		return await this.worlds.save(world);
	}

	async findAll(): Promise<WorldEntity[]> {
		return await this.worlds.find();
	}

	async findOne(id: number): Promise<WorldEntity> {
		return await this.worlds.findOneOrFail({where: {id}});
	}

}
