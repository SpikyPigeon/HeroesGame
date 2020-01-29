import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {BankEntity} from "./bank.entity";

@Injectable()
export class BankService {
	constructor(
		@Inject("BANK_REPOSITORY")
		private readonly banks: Repository<BankEntity>
	) {
	}

	async findAll(): Promise<Array<BankEntity>> {
		return await this.banks.find();
	}

	async findOne(id: string): Promise<BankEntity> {
		return await this.banks.findOneOrFail(id);
	}

	async create(): Promise<BankEntity> {
		const bank = this.banks.create({
			goldAmount: 0,
		});
		return await this.banks.save(bank);
	}

	async addMoney(id: string, amount: number): Promise<BankEntity> {
		const bank = await this.findOne(id);
		bank.goldAmount += amount;
		return await this.banks.save(bank);
	}

	async takeMoney(id: string, amount: number): Promise<BankEntity> {
		const bank = await this.findOne(id);
		if (amount > bank.goldAmount) {
			throw new Error("Not enough savings.");
		} else {
			bank.goldAmount -= amount;
			return await this.banks.save(bank);
		}
	}
}
