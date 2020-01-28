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

	async create(world: WorldEntity): Promise<SquareEntity[]> {
		const squares = new Array<SquareEntity>();

		for (let x = 0; x < world.limitX; x++) {
			for (let y = 0; y < world.limitY; y++) {
				squares.push(this.squares.create({
					image: "",
					world,
					x,
					y,
				}));
			}
		}

		return await this.squares.save(squares);
	}
}
