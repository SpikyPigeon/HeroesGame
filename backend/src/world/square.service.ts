import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareEntity} from "./square.entity";

@Injectable()
export class SquareService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly squares: Repository<SquareEntity>
	) {
	}

	async create(worldId: number, x: number, y: number): Promise<SquareEntity> {
		const square = new SquareEntity();
		square.worldId = worldId;
		square.x = x;
		square.y = y;
		return await this.squares.save(square);
	}
}
