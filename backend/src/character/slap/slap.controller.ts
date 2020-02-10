import {Controller, Logger} from "@nestjs/common";

@Controller()
export class SlapController {
	private readonly logger: Logger = new Logger(SlapController.name);
}
