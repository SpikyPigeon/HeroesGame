export const characterConfig = {
	stats: {
		start: 10,
		startPoints: 10,

		calculate: {
			damage(strength: number, totalMod: number): {min: number, max: number} {
				return {
					min: strength * 2 + totalMod,
					max: strength * 4 + totalMod,
				};
			},

			health(vitality: number, totalMod: number): number {
				return vitality * 10 + totalMod;
			},

			mana(intellect: number, totalMod: number): number {
				return intellect * 5 + totalMod;
			},

			dodgeChance(dexterity: number, totalMod: number): number {
				const total = dexterity * 0.15 + totalMod;
				return total > 95 ? 95 : total;
			},

			criticalChance(dexterity: number, totalMod: number): number {
				const total = 2 * Math.sqrt(dexterity) + totalMod;
				return total > 95 ? 95 : total;
			},
		}
	},
	generate: {
		isCritical(dexterity: number, totalMod: number): boolean {
			return Math.random() <= characterConfig.stats.calculate.criticalChance(dexterity, totalMod) / 100;
		},

		isDodge(dexterity: number, totalMod: number): boolean {
			return Math.random() <= characterConfig.stats.calculate.dodgeChance(dexterity, totalMod) / 100;
		},

		damage(strength: number, totalMod: number, criticalDmgMod: number, isCritical: boolean): number {
			const {min, max} = characterConfig.stats.calculate.damage(strength, totalMod);
			const dmg = Math.floor(Math.random() * (max - min + 1)) + min;
			return isCritical ? dmg * (1.25 + criticalDmgMod / 10) : dmg;
		},
	},
};
