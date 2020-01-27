import {Inject, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareService} from "./square.service";
import {WorldEntity} from "./world.entity";

@Injectable()
export class WorldService {
	private readonly logger: Logger = new Logger(WorldService.name);

	constructor(
		@Inject("WORLD_REPOSITORY")
		private readonly worlds: Repository<WorldEntity>,
		private readonly squares: SquareService,
	) {
	}

	async create(name: string, limitX: number, limitY: number, color: string, bgImage: string): Promise<WorldEntity> {
		this.logger.log("WorldService.create");

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
}
