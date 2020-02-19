import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";

import {SocketPayload} from "heroes-common";
import {UserService, AuthService, UserEntity} from "../user";
import {CharacterService} from "../character";

@Injectable()
export class SocketService implements OnModuleInit {
	private readonly logger: Logger = new Logger(SocketService.name);
	private characters!: CharacterService;

	constructor(
		private readonly users: UserService,
		private readonly auth: AuthService,
		private readonly refs: ModuleRef,
	) {
	}

	onModuleInit() {
		this.characters = this.refs.get(CharacterService, {strict: false});
	}

	async validatePayload(payload: SocketPayload): Promise<UserEntity> {
		try {
			const auth = await this.auth.verifyToken(payload.token);
			this.logger.log(`validatePayload => ${auth.email}`);
			return await this.users.findOneById(auth.sub);
		} catch(e) {
			throw new Error(e);
		}
	}
}
