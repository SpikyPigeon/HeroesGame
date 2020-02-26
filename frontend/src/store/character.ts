import {action, Action, thunk, Thunk} from "easy-peasy";
import {
	Avatar,
	CharacterInfo,
	CharacterInventory,
	config,
	EquipmentSlotType,
	EquipmentType,
	getEquipmentType,
	getItemType,
	Item,
	ItemType,
	MoveCharacterInfo,
	PlayerCharacter,
	UpdateCharacterInfo
} from "heroes-common";

import {CharacterService} from "./context";
import {AppStore} from "./index";

export interface CharacterStore {
	character: PlayerCharacter | null;
	inventory: Array<CharacterInventory>;

	listAvatars: Thunk<CharacterStore, void, any, {}, Promise<Array<Avatar>>>;
	getAvatar: Thunk<CharacterStore, number, any, {}, Promise<Avatar>>;

	setCharacter: Action<CharacterStore, PlayerCharacter | null>;
	update: Action<CharacterStore, Partial<UpdateCharacterInfo>>;
	getMine: Thunk<CharacterStore>;
	userHasChar: Thunk<CharacterStore, void, any, {}, Promise<boolean>>;
	create: Thunk<CharacterStore, CharacterInfo>;
	moveTo: Thunk<CharacterStore, MoveCharacterInfo, any, AppStore>;

	setInventory: Action<CharacterStore, Array<CharacterInventory>>;
	updateInventory: Thunk<CharacterStore, { id: string; quantity: number; }, any, {}, Promise<CharacterInventory>>;
	deleteInventory: Thunk<CharacterStore, CharacterInventory>;
	pickupItem: Thunk<CharacterStore, { item: Item, quantity: number }, any, AppStore, Promise<number>>;

	consumeItem: Thunk<CharacterStore, CharacterInventory, any, AppStore>;

	equipItem: Thunk<CharacterStore, CharacterInventory, any, AppStore>;
	unequipItem: Thunk<CharacterStore, EquipmentSlotType, any, AppStore>;
}

export const characterStore: CharacterStore = {
	character: null,
	inventory: [],

	listAvatars: thunk(async () => {
		return await CharacterService.listAllAvatars();
	}),

	getAvatar: thunk(async (state, payload) => {
		return await CharacterService.getAvatar(payload);
	}),

	setCharacter: action((state, payload) => {
		state.character = payload;
	}),

	update: action((state, payload) => {
		if (state.character) {
			state.character = {...state.character, ...payload};

			if (state.character.currentHealth <= 0) {
				state.character.currentHealth = 0;
				state.character.isDead = true;
			}

			if (state.character.currentHealth > 0 && state.character.isDead) {
				state.character.isDead = false;
			}

			const token = localStorage.getItem("userJWT");
			if (token) {
				CharacterService.update(token, payload).catch(console.error);
			}
		}
	}),

	getMine: thunk(async (state, payload, {getState}) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.findMine(token));

			const char = getState().character;
			if (char) {
				state.setInventory(await CharacterService.findInventory(char.id));
			}
		} else {
			throw new Error("Not logged in!");
		}
	}),

	userHasChar: thunk(async () => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			return await CharacterService.userHasChar(token);
		} else {
			return false
		}
	}),

	create: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.create(token, payload));
		} else {
			throw new Error("Not logged in!");
		}
	}),

	moveTo: thunk(async (state, payload, {getStoreActions}) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			state.setCharacter(await CharacterService.moveTo(token, payload));
			getStoreActions().world.clearDrops();
		} else {
			throw new Error("Not logged in!");
		}
	}),

	setInventory: action((state, payload) => {
		state.inventory = [...payload];
	}),

	updateInventory: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			const slot = await CharacterService.updateInventory(token, payload.id, payload.quantity);

			await state.getMine();
			return slot;
		} else {
			throw new Error("Not logged in!");
		}
	}),

	deleteInventory: thunk(async (state, payload) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
			if (!await CharacterService.deleteInventory(token, payload.id)) {
				throw new Error("Could not delete item");
			}

			await state.getMine();

			if (!await CharacterService.deleteItemRoll(token, payload.roll)) {
				throw new Error("Could not delete item roll");
			}
		} else {
			throw new Error("Not logged in!");
		}
	}),

	pickupItem: thunk(async (state, {item, quantity}, {getState, getStoreActions}) => {
		const addSnack = getStoreActions().notification.enqueue;
		const token = localStorage.getItem("userJWT");
		if (token) {
			const {id: itemId, stackLimit} = item;
			const inventory = getState().inventory;
			const slot = inventory.find(value => value.roll.item.id === itemId && value.quantity < stackLimit);
			if (slot) {
				if (slot.quantity + quantity > stackLimit) {
					await CharacterService.updateInventory(token, slot.id, stackLimit);
					let picked: number = stackLimit - quantity;

					if (inventory.length === 10) {
						addSnack({
							message: "Inventory is full!",
							options: {
								variant: "error",
							},
						});
					} else {
						const roll = await CharacterService.createItemRoll(token, item);
						picked = quantity - (stackLimit - slot.quantity);
						await CharacterService.createInventory(token, {
							roll: roll.id,
							quantity: quantity - (stackLimit - slot.quantity),
						});
					}

					await state.getMine();
					return picked;
				} else {
					await CharacterService.updateInventory(token, slot.id, slot.quantity + quantity);
					await state.getMine();
					return quantity;
				}
			} else {
				if (inventory.length === 10) {
					addSnack({
						message: "Inventory is full!",
						options: {
							variant: "error",
						},
					});
					return 0;
				} else {
					const roll = await CharacterService.createItemRoll(token, item);
					let picked: number = 0;
					if (quantity <= stackLimit) {
						picked = quantity;
					} else {
						picked = stackLimit;
					}

					await CharacterService.createInventory(token, {
						roll: roll.id,
						quantity: picked,
					});

					await state.getMine();
					return picked;
				}
			}
		} else {
			throw new Error("Not logged in!");
		}
	}),

	consumeItem: thunk((state, payload, {getState, getStoreActions}) => {
		const addSnack = getStoreActions().notification.enqueue;
		const char = getState().character;
		const it = getItemType(payload.roll.item);

		if (char && it === ItemType.Consumable) {
			if (payload.roll.item.heal > 0) {
				const maxHp = config.character.stats.calculate.health(char.vitality, 0);
				const oldHp = char.currentHealth;
				let qtyUsed: number = 0;
				if (oldHp === maxHp) {
					addSnack({
						message: "Your health is already maxed!",
						options: {
							variant: "warning"
						}
					})
				} else if ((maxHp - oldHp) < payload.roll.item.heal) {
					state.update({
						currentHealth: maxHp,
					});
					addSnack({
						message: `You gained ${maxHp - oldHp} health points. Your health is fully restored!`,
						options: {
							variant: "success"
						}
					});
					qtyUsed++;
				} else {
					state.update({
						currentHealth: oldHp + payload.roll.item.heal,
					});
					addSnack({
						message: `You gained ${payload.roll.item.heal} health points.${char.currentHealth === maxHp ? " Your health is fully restored!" : ""}`,
						options: {
							variant: "success"
						}
					});
					qtyUsed++;
				}
				state.updateInventory({id: payload.id, quantity: payload.quantity - qtyUsed}).then(value => {
					if (value.quantity <= 0) {
						state.deleteInventory(value).catch(console.error);
					}
				}).catch(console.error);
			}
		}
	}),

	equipItem: thunk(async (state, payload, {getState, getStoreActions}) => {
		const addSnack = getStoreActions().notification.enqueue;
		const token = localStorage.getItem("userJWT");

		if (token) {
			const eq = payload.roll.id;
			const char = getState().character;
			const type = getEquipmentType(payload.roll.item);

			if (type === EquipmentType.Hand) {
				if (char?.equipment.leftHandSlot === null) {
					CharacterService.updateEquipment(token, {leftHandSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else if (char?.equipment.rightHandSlot === null) {
					CharacterService.updateEquipment(token, {rightHandSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your hands are full!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Ring) {
				if (char?.equipment.ring1Slot === null) {
					CharacterService.updateEquipment(token, {ring1Slot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else if (char?.equipment.ring2Slot === null) {
					CharacterService.updateEquipment(token, {ring2Slot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your ring slots are full!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Chest) {
				if (char?.equipment.chestSlot === null) {
					CharacterService.updateEquipment(token, {chestSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your chest is already equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Neck) {
				if (char?.equipment.neckSlot === null) {
					CharacterService.updateEquipment(token, {neckSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your neck is already equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Belt) {
				if (char?.equipment.beltSlot === null) {
					CharacterService.updateEquipment(token, {beltSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your belt is already equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Boot) {
				if (char?.equipment.bootSlot === null) {
					CharacterService.updateEquipment(token, {bootSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your feet are already equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Head) {
				if (char?.equipment.headSlot === null) {
					CharacterService.updateEquipment(token, {headSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `Your head is already equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Bag) {
				if (char?.equipment.bagSlot === null) {
					CharacterService.updateEquipment(token, {bagSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `You already have a bag equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			if (type === EquipmentType.Artifact) {
				if (char?.equipment.artifactSlot === null) {
					CharacterService.updateEquipment(token, {artifactSlot: eq}).catch(console.error);
					if (!await CharacterService.deleteInventory(token, payload.id)) {
						throw new Error("Could not delete item");
					}
				} else {
					addSnack({
						message: `You already have an artifact equipped!`,
						options: {
							variant: "warning"
						}
					});
				}
			}
			await state.getMine();
		} else {
			throw new Error("Not logged in!");
		}
	}),

	unequipItem: thunk(async (state, payload, {getState, getStoreActions}) => {
		const token = localStorage.getItem("userJWT");
		if (token) {
		} else {
			throw new Error("Not logged in!");
		}
	}),
};
