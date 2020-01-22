export interface ItemCategory {
	id: number;
	parent: ItemCategory | null;
	name: string;
	description: string;
	createdAt: Date;
}
