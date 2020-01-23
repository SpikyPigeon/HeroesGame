import {Inject, Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InventoryEntity} from "./inventory.entity";
import {ItemService, RollService} from "../item";

@Injectable()
export class InventoryService {
	constructor(
		@Inject("INVENTORY_REPOSITORY")
		private readonly avatars: Repository<InventoryEntity>,
		private readonly items: ItemService,
		private readonly rolls: RollService,
	) {
	}
}
