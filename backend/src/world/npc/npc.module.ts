import {forwardRef, Module} from "@nestjs/common";
import {DatabaseModule} from "../../database";
import {NpcService} from "./npc.service";
import {npcProviders} from "./npc.provider";
import {NpcController} from "./npc.controller";
import {UserModule} from "../../user";

@Module({
	exports: [
		NpcService,
	],
	imports: [
		DatabaseModule,
		forwardRef(() => UserModule),
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
