export const monsterConfig = {
	generate: {
		hasSpawned(chance: number): boolean {
			return Math.random() <= chance;
		},

		quantity(min: number, max: number): number {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		isCritical(dexterity: number): boolean {
			return Math.random() <= monsterConfig.calculate.criticalChance(dexterity) / 100;
		},

		isDodge(dexterity: number): boolean {
			return Math.random() <= monsterConfig.calculate.dodgeChance(dexterity) / 100;
		},

		damage(strength: number, isCritical: boolean): number {
			const {min, max} = monsterConfig.calculate.damage(strength);
			const dmg = Math.floor(Math.random() * (max - min + 1)) + min;
			return isCritical ? dmg * 2 : dmg;
		},
	},
	calculate: {
		exp(monsterLvl: number, playerLvl: number): number {
			return 100 + (monsterLvl - playerLvl) * 15;
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
