import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {SquareEntity} from "./square.entity";
import {WorldEntity} from "./world.entity";
import {UpdateSquareImageInfo} from "./world.dto";

@Injectable()
export class SquareService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly squares: Repository<SquareEntity>
	) {
	}

	async findAll(worldId: number): Promise<Array<SquareEntity>> {
		return await this.squares.find({where: {worldId}});
	}

	async findOne(worldId: number, x: number, y: number): Promise<SquareEntity> {
		return await this.squares.findOneOrFail({
			where: {
				worldId, x, y
			}
		});
	}

	async create(world: WorldEntity): Promise<Array<SquareEntity>> {
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

	async setImage(worldId: number, x: number, y: number, newImage: UpdateSquareImageInfo): Promise<SquareEntity> {
		const square = await this.findOne(worldId, x, y);
		square.image = newImage.filename;
		return await this.squares.save(square);
	}
}
