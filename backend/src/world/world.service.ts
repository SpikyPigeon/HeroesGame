import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {WorldEntity} from "./world.entity";
import {SquareService} from "./square.service";

@Injectable()
export class WorldService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly worlds: Repository<WorldEntity>,
		private readonly squares: SquareService
	) {
	}

	async create(name: string, X: number, Y: number, color: string, bgImage: string): Promise<WorldEntity> {
		const world = new WorldEntity();
		world.name = name;
		world.limitX = X;
		world.limitY = Y;
		world.color = color;
		world.bgImage = bgImage;
		let protoWorld = await this.worlds.save(world);
		for (let i = 0; i <= world.limitX; i++) {
			for (let j = 0; j <= world.limitY; i++) {
				await this.squares.create(protoWorld.id, i, j);
			}
		}
		return protoWorld;
	}
}
