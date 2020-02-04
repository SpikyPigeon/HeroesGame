import {Controller, Get, Param, Put} from "@nestjs/common";
import {SquareService} from "./square.service";
import {SquareEntity} from "./square.entity";
import {ApiBody} from "@nestjs/swagger";
import {UpdateSquareImageInfo} from "./world.dto";

@Controller("/square")
export class SquareController {
	constructor(private readonly squares: SquareService) {
	}

	@Get(":worldId")
	async findAll(@Param("worldId") worldId: number): Promise<Array<SquareEntity>> {
		return await this.squares.findAll(worldId);
	}

	@Get(":worldId/:x/:y")
	async findOne(@Param("worldId") worldId: number, @Param("x") x: number, @Param("y") y: number): Promise<SquareEntity> {
		return await this.squares.findOne(worldId, x, y);
	}

	@ApiBody({type: UpdateSquareImageInfo})
	@Put(":worldId/:x/:y")
	async setImage(@Param("worldId") worldId: number, @Param("x") x: number, @Param("y") y: number, @Param("newImage") newImage: UpdateSquareImageInfo): Promise<SquareEntity> {
		return await this.squares.setImage(worldId, x, y, newImage);
	}
}
