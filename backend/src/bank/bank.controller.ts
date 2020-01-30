import {Controller, Get, Param, Put, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {BankService} from "./bank.service";
import {BankEntity} from "./bank.entity";

@ApiTags("user")
@Controller()
export class BankController {
	constructor(private readonly banks: BankService) {
	}

	@ApiOkResponse({type: BankEntity, isArray: true})
	@Get()
	async findAll(): Promise<Array<BankEntity>> {
		return await this.banks.findAll();
	}

	@ApiOkResponse({type: BankEntity})
	@Get(":id")
	async findOne(@Param("id") id: string): Promise<BankEntity> {
		return await this.banks.findOne(id);
	}

	@ApiOkResponse({type: BankEntity})
	@Put(":id/add")
	async addMoney(@Param("id") id: string, @Query("amount") amount: number): Promise<BankEntity> {
		return await this.banks.addMoney(id, amount);
	}

	@ApiOkResponse({type: BankEntity})
	@Put(":id/take")
	async takeMoney(@Param("id") id: string, @Query("amount") amount: number): Promise<BankEntity> {
		return await this.banks.takeMoney(id, amount);
	}
}
