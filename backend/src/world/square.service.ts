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
}
