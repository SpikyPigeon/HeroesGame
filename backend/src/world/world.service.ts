import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {WorldEntity} from "./world.entity";

@Injectable()
export class WorldService {
	constructor(
		@Inject("SQUARE_REPOSITORY")
		private readonly worlds: Repository<WorldEntity>
	) {
	}
}
