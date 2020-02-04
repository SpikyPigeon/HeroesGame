import {Body, Controller, Get, Param, Put} from "@nestjs/common";
import {ApiBody, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {UpdateSquareImageInfo} from "./world.dto";
import {SquareService} from "./square.service";
import {SquareEntity} from "./square.entity";

@ApiTags("world")
@Controller("/square")
export class SquareController {
	constructor(private readonly squares: SquareService) {
	}

	@ApiOkResponse({type: SquareEntity, isArray: true})
	@Get(":worldId")
	async findAll(@Param("worldId") worldId: number): Promise<Array<SquareEntity>> {
		return await this.squares.findAll(worldId);
	}

	@ApiOkResponse({type: SquareEntity})
	@Get(":worldId/:x/:y")
	async findOne(@Param("worldId") worldId: number, @Param("x") x: number, @Param("y") y: number): Promise<SquareEntity> {
		return await this.squares.findOne(worldId, x, y);
	}

	@ApiOkResponse({type: SquareEntity})
	@ApiBody({type: UpdateSquareImageInfo})
	@Put(":worldId/:x/:y")
	async setImage(@Param("worldId") worldId: number, @Param("x") x: number, @Param("y") y: number, @Param("newImage") newImage: UpdateSquareImageInfo): Promise<SquareEntity> {
		return await this.squares.setImage(worldId, x, y, newImage);
	}
}
