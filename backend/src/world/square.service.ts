import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UpdateSquareImageInfo} from "./world.dto";
import {SquareEntity} from "./square.entity";
import {WorldEntity} from "./world.entity";

@Injectable()
export class SquareService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly squares: Repository<SquareEntity>,
	) {
	}

	async findAll(worldId: number): Promise<Array<SquareEntity>> {
		return await this.squares.createQueryBuilder("square")
			.leftJoinAndSelect("square.world", "world")
			.where("world.id = :worldId", {worldId})
			.getMany();
	}

	async findOne(worldId: number, x: number, y: number): Promise<SquareEntity> {
		const square = await this.squares.createQueryBuilder("square")
			.leftJoinAndSelect("square.world", "world")
			.where("world.id = :worldId AND square.x = :x AND square.y = :y", {worldId, x, y})
			.getOne();

		if (square) {
			return square;
		} else {
			throw new Error(`Square@${worldId}:${x}.${y} not found!`);
		}
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

	async setImage(worldId: number, x: number, y: number, newImage: Partial<UpdateSquareImageInfo>): Promise<SquareEntity> {
		const square = await this.findOne(worldId, x, y);
		if(newImage.filenameImage){
			square.image = newImage.filenameImage;
		}
		if(newImage.filenameIcon){
			square.icon = newImage.filenameIcon;
		}
		return await this.squares.save(square);
	}
}
