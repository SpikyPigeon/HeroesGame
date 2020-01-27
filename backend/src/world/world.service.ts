import {Inject, Injectable, Logger} from "@nestjs/common";
import {Repository} from "typeorm";
import {WorldEntity} from "./world.entity";
import {SquareEntity} from "./square.entity";

@Injectable()
export class WorldService {
	private readonly logger: Logger = new Logger(WorldService.name);

	constructor(
		@Inject("WORLD_REPOSITORY")
		private readonly worlds: Repository<WorldEntity>,
		@Inject("SQUARE_REPOSITORY")
		private readonly squares: Repository<SquareEntity>
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

		const squares = new Array<SquareEntity>();

		for (let i = 0; i <= limitX; i++) {
			for (let j = 0; j <= limitY; j++) {
				squares.push(this.squares.create({
					image: "",
					world,
					x: i,
					y: j,
				}));
			}
		}

		await this.squares.save(squares);
		return world;
	}
}
