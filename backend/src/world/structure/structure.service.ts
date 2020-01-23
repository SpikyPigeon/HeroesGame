import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {StructureEntity} from "./structure.entity";

@Injectable()
export class StructureService {
	constructor(
		@Inject("STRUCTURE_REPOSITORY")
		private readonly encounters: Repository<StructureEntity>,
	) {
	}
}
