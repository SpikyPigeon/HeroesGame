import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {BankEntity} from "./bank.entity";

@Injectable()
export class BankService {
	constructor(
		@Inject("BANK_REPOSITORY")
		private readonly squares: Repository<BankEntity>
	) {
	}
}
