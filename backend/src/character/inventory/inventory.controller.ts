import {Controller, Logger} from "@nestjs/common";

@Controller()
export class InventoryController {
	private readonly logger: Logger = new Logger(InventoryController.name);
}
