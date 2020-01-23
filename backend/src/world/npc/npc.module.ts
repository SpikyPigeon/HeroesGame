import {Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {NpcService} from "./npc.service";
import {npcProviders} from "./npc.provider";
import {NpcController} from "./npc.controller";

@Module({
	exports: [
		NpcService,
	],
	imports: [
		DatabaseModule,
	],
	controllers: [
		NpcController,
	],
	providers: [
		...npcProviders,
		NpcService,
	],
})
export class NpcModule {
}
