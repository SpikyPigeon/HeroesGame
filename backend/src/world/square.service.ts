import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareEntity} from "./square.entity";
import {WorldEntity} from "./world.entity";

@Injectable()
export class SquareService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly squares: Repository<SquareEntity>
	) {
	}

	async create(world: WorldEntity, x: number, y: number): Promise<SquareEntity> {
		return await this.squares.save(this.squares.create({
			image: "",
			world,
			x,
			y,
		}));
	}
}
