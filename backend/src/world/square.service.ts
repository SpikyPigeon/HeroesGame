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

	async findOne(worldId: number, x: number, y: number): Promise<SquareEntity>{
		return await this.squares.findOneOrFail({where: {
			worldId, x, y
			}});
	}

	async findAll(worldId: number): Promise<SquareEntity[]>{
		return await this.squares.find({where: {worldId}});
	}

	async setImage(worldId: number, x: number, y: number, newImage: string): Promise<SquareEntity> {
		const square = await this.findOne(worldId, x, y);
		square.image = newImage;
		return await this.squares.save(square);
	}

}
