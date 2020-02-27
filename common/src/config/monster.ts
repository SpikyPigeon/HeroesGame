import {EncounterDrop, Item} from "../interfaces";

export const monsterConfig = {
	generate: {
		hasSpawned(chance: number): boolean {
			return Math.random() <= chance;
		},

		isCritical(dexterity: number): boolean {
			return Math.random() <= monsterConfig.calculate.criticalChance(dexterity) / 100;
		},

		isDodge(dexterity: number): boolean {
			return Math.random() <= monsterConfig.calculate.dodgeChance(dexterity) / 100;
		},

		damage(strength: number, isCritical: boolean, armor: number): number {
			const {min, max} = monsterConfig.calculate.damage(strength);
			const dmg = Math.floor(Math.random() * (max - min + 1)) + min;
			const res = dmg * (Math.sqrt(armor) / 25);
			return Math.round(isCritical ? (dmg - res) * 2 : dmg - res);
		},

		goldDrop(min: number, max: number): number {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		itemDrops(drops: Array<EncounterDrop>, dropBonus: number): Array<{ item: Item; quantity: number }> {
			let items: Array<{ item: Item; quantity: number }> = [];
			drops.forEach(value => {
				if (Math.random() <= value.dropChance * (1 + dropBonus / 100)) {
					items = [...items, {
						item: value.item,
						quantity: Math.floor(Math.random() * (value.maxQuantity - value.minQuantity + 1)) + value.minQuantity,
					}];
				}
			});
			return items;
		}
	},
	calculate: {
		exp(monsterLvl: number, playerLvl: number): number {
			const value = 100 + (monsterLvl - playerLvl) * 15;
			return value > 0 ? value : 0;
		},

		damage(strength: number): { min: number, max: number } {
			return {
				min: strength * 2,
				max: strength * 4,
			};
		},

		health(vitality: number): number {
			return vitality * 10;
		},

		dodgeChance(dexterity: number): number {
			const total = dexterity * 0.15;
			return total > 95 ? 95 : total;
		},

		criticalChance(dexterity: number): number {
			const total = 2 * Math.sqrt(dexterity);
			return total > 95 ? 95 : total;
		},
	}
};
