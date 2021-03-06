import {Injectable, Logger, OnModuleInit} from "@nestjs/common";
import {ModuleRef} from "@nestjs/core";

import {SocketPayload} from "heroes-common";
import {AuthService, UserEntity, UserService} from "../user";
import {CharacterEntity, CharacterService} from "../character";

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
		} catch (e) {
			throw new Error(e);
		}
	}

	async getCharacter(user: string): Promise<CharacterEntity> {
		return await this.characters.findMine(user);
	}
}
