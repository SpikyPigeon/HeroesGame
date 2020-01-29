import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InventoryEntity} from "./inventory.entity";

@Injectable()
export class InventoryService {
	constructor(
		@Inject("INVENTORY_REPOSITORY")
		private readonly inventories: Repository<InventoryEntity>,
	) {
	}
}
