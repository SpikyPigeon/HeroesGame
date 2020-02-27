import {ItemRoll, PlayerCharacter} from "../interfaces";

interface CharacterDerivedStats {
	strength: number;
	dexterity: number;
	vitality: number;
	intellect: number;
	maxHealth: number;
	maxMana: number;
	criticalChance: number;
	criticalDamage: number;
	dodgeChange: number;
	damage: number;
	armor: number;
	itemDrop: number;
	goldDrop: number;
}

export const characterConfig = {
	stats: {
		start: 10,
		startPoints: 10,
		levelPoints: 5,

		calculate: {
			damage(strength: number, totalMod: number): { min: number, max: number } {
				return {
					min: strength * 2 + totalMod,
					max: strength * 4 + totalMod,
				};
			},

			health(vitality: number, totalMod: number): number {
				return Math.round(vitality * 10 + totalMod);
			},

			mana(intellect: number, totalMod: number): number {
				return Math.round(intellect * 5 + totalMod);
			},

			dodgeChance(dexterity: number, totalMod: number): number {
				const total = dexterity * 0.15 + totalMod;
				return total > 95 ? 95 : total;
			},

			criticalChance(dexterity: number, totalMod: number): number {
				const total = 2 * Math.sqrt(dexterity) + totalMod;
				return total > 95 ? 95 : total;
			},

			derivedStats(character: PlayerCharacter): CharacterDerivedStats {
				const stats: CharacterDerivedStats = {
					strength: character.strength,
					dexterity: character.dexterity,
					vitality: character.vitality,
					intellect: character.intellect,

					maxHealth: 0,
					maxMana: 0,
					armor: 0,
					damage: 0,
					criticalChance: 0,
					criticalDamage: 0,
					dodgeChange: 0,
					goldDrop: 0,
					itemDrop: 0,
				};

				Reflect.ownKeys(character.equipment).forEach(value => {
					if (value.toString().endsWith("Slot")) {
						const slot: ItemRoll | null = Reflect.get(character.equipment, value);
						if (slot) {
							if (slot.item.strengthMod > 0) {
								stats.strength += slot.item.strengthMod * slot.strengthMult;
							}

							if (slot.item.dexterityMod > 0) {
								stats.dexterity += slot.item.dexterityMod * slot.dexterityMult;
							}

							if (slot.item.vitalityMod > 0) {
								stats.vitality += slot.item.vitalityMod * slot.vitalityMult;
							}

							if (slot.item.intellectMod > 0) {
								stats.intellect += slot.item.intellectMod * slot.intellectMult;
							}

							if (slot.item.healthMod > 0) {
								stats.maxHealth += slot.item.healthMod * slot.healthMult;
							}

							if (slot.item.manaMod > 0) {
								stats.maxMana += slot.item.manaMod * slot.manaMult;
							}

							if (slot.item.armorMod > 0) {
								stats.armor += slot.item.armorMod * slot.armorMult;
							}

							if (slot.item.damageMod > 0) {
								stats.damage += slot.item.damageMod * slot.damageMult;
							}

							if (slot.item.criticalChanceMod > 0) {
								stats.criticalChance += slot.item.criticalChanceMod * slot.criticalChanceMult;
							}

							if (slot.item.criticalDamageMod > 0) {
								stats.criticalDamage += slot.item.criticalDamageMod * slot.criticalDamageMult;
							}

							if (slot.item.dodgeChanceMod > 0) {
								stats.dodgeChange += slot.item.dodgeChanceMod * slot.dodgeChanceMult;
							}

							if (slot.item.goldDropMod > 0) {
								stats.goldDrop += slot.item.goldDropMod * slot.goldDropMult;
							}

							if (slot.item.itemDropMod > 0) {
								stats.itemDrop += slot.item.itemDropMod * slot.itemDropMult;
							}
						}
					}
				});

				return stats;
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
