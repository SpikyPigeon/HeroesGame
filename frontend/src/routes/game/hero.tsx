import {createElement, Fragment, FunctionComponent, useState} from "react";
import {useNavigation} from "react-navi";
import {useMount} from "react-use";
import {
	Badge,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Divider,
	Grid,
	GridList,
	GridListTile,
	makeStyles,
	Menu,
	MenuItem,
	Theme,
	Tooltip,
	Typography,
	withStyles,
} from "@material-ui/core";

import {store, useStoreActions, useStoreState} from "../../store";
import {
	CharacterEquipment,
	CharacterInventory,
	EquipmentSlotType,
	getItemType,
	ItemRarity,
	ItemRoll,
	ItemType
} from "heroes-common";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemSlotCard: {
			width: 128,
			height: 128,
		},
		itemSlotAction: {
			width: "100%",
			height: "100%",
		},
	}),
);

const HtmlTooltip = withStyles((theme: Theme) => ({
	tooltip: {
		backgroundColor: (props: { rarity: ItemRarity }) => {
			switch (props.rarity) {
				case "common":
					return "#f5f5f9";
				case "uncommon":
					return "#b1e2d3";
				case "rare":
					return "#ffe887";
				case "legendary":
					return "#ffa181";
				case "unique":
					return "#ffd700";
			}
		},
		color: "rgba(0, 0, 0, 0.87)",
		maxWidth: 440,
		fontSize: theme.typography.pxToRem(12),
		border: "1px solid #dadde9",
	},
}))(Tooltip);

interface ItemInspectProps {
	roll: ItemRoll;
}

const ItemInspect: FunctionComponent<ItemInspectProps> = ({roll}) => {
	return <Fragment>
		<Typography color="inherit">
			<u>{roll.item.name}</u>
			<small><em> {roll.item.category.parent?.name} - {roll.item.category.name}</em></small>
		</Typography>

		<small>{roll.item.description}</small>
		<Divider/>
		<ul>
			{roll.item.heal > 0 && <li>
				<Typography variant="caption">
					{`Heals ${roll.item.heal} Health points.`}
				</Typography>
			</li>}
			{roll.item.strengthMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.strengthMod * roll.strengthMult).toPrecision(4)} Strength points.`}
				</Typography>
			</li>}
			{roll.item.dexterityMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.dexterityMod * roll.dexterityMult).toPrecision(4)} Dexterity points.`}
				</Typography>
			</li>}
			{roll.item.vitalityMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.vitalityMod * roll.vitalityMult).toPrecision(4)} Vitality points.`}
				</Typography>
			</li>}
			{roll.item.intellectMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.intellectMod * roll.intellectMult).toPrecision(4)} Intellect points.`}
				</Typography>
			</li>}
			{roll.item.damageMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.damageMod * roll.damageMult).toPrecision(4)} points to Damage dealt.`}
				</Typography>
			</li>}
			{roll.item.armorMod > 0 && <li>
				<Typography variant="caption">
					{`Removes ${(roll.item.armorMod * roll.armorMult).toPrecision(4)}% of damage taken.`}
				</Typography>
			</li>}
			{roll.item.criticalChanceMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.criticalChanceMod * roll.criticalChanceMult).toPrecision(4)}% chance of Critical Hit.`}
				</Typography>
			</li>}
			{roll.item.criticalDamageMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.criticalDamageMod * roll.criticalDamageMult).toPrecision(4)}% damage on Critical Hits.`}
				</Typography>
			</li>}
			{roll.item.dodgeChanceMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.dodgeChanceMod * roll.dodgeChanceMult).toPrecision(4)}% chance of Dodging attacks.`}
				</Typography>
			</li>}
			{roll.item.healthMod > 0 && <li>
				<Typography variant="caption">
					{`Increases Max Health by ${(roll.item.healthMod * roll.healthMult).toPrecision(4)}%.`}
				</Typography>
			</li>}
			{roll.item.manaMod > 0 && <li>
				<Typography variant="caption">
					{`Increases Max Mana by ${(roll.item.manaMod * roll.manaMult).toPrecision(4)}%.`}
				</Typography>
			</li>}
			{roll.item.itemDropMod > 0 && <li>
				<Typography variant="caption">
					{`Adds ${(roll.item.itemDropMod * roll.itemDropMult).toPrecision(4)}% chance of finding loot.`}
				</Typography>
			</li>}
			{roll.item.goldDropMod > 0 && <li>
				<Typography variant="caption">
					{`Gold rewards increased by ${(roll.item.goldDropMod * roll.goldDropMult).toPrecision(4)}%.`}
				</Typography>
			</li>}
		</ul>
		{roll.item.stackLimit > 1 && (<Fragment><Divider/>{`Stacks up to ${roll.item.stackLimit}`}</Fragment>)}
	</Fragment>;
};

interface EquipmentSlotProps {
	name: EquipmentSlotType;
	slot?: CharacterEquipment;
	onEquip?: (slot: CharacterEquipment) => void;
}

const EquipmentSlot: FunctionComponent<EquipmentSlotProps> = ({name, slot, onEquip}) => {
	const classes = useStyles();
	const [raised, setRaised] = useState(false);
	const [equipEl, setEquipEl] = useState<null | HTMLElement>(null);
	const handleEquipClose = () => setEquipEl(null);

	const emptySlot = <Card raised={raised} classes={{root: classes.itemSlotCard}}>
		<CardActionArea
			classes={{root: classes.itemSlotAction}}
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() => setRaised(false)}
		>
			<CardContent>
				<Typography>{name}</Typography>
			</CardContent>
		</CardActionArea>
	</Card>;

	if (slot) {
		const toCamelCase = (str: string) => str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '');
		let eqItem = Reflect.get(slot, Reflect.ownKeys(slot).find(value => {
			const prop = toCamelCase(name) + "Slot";
			return value === prop;
		}) ?? 0) as ItemRoll | undefined;

		if (eqItem?.item) {
			return <Fragment>
				<Menu
					keepMounted
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
					anchorEl={equipEl}
					open={Boolean(equipEl)}
					onClose={handleEquipClose}
				>
					<MenuItem onClick={handleEquipClose}>Unequip</MenuItem>
				</Menu>
				<Card raised={raised} classes={{root: classes.itemSlotCard}}>
					<CardActionArea
						classes={{root: classes.itemSlotAction}}
						onMouseEnter={() => setRaised(true)}
						onMouseLeave={() => setRaised(false)}
						onClick={e => setEquipEl(e.currentTarget.parentElement)}
					>
						<HtmlTooltip
							rarity={eqItem.item.rarity}
							title={<ItemInspect roll={eqItem}/>}
						>
							<CardContent>
								<CardMedia
									component="img"
									image={`/assets/items/${eqItem.item.image}`}
									height={94}
								/>
							</CardContent>
						</HtmlTooltip>
					</CardActionArea>
				</Card>
			</Fragment>;
		} else {
			return emptySlot;
		}
	} else {
		return emptySlot;
	}
};

interface InventorySlotProps {
	slot?: CharacterInventory;
	onUse?: (slot: CharacterInventory) => void;
}

const InventorySlot: FunctionComponent<InventorySlotProps> = ({slot, onUse}) => {
	const classes = useStyles();
	const discardAll = useStoreActions(state => state.character.deleteInventory);
	const discardOne = useStoreActions(state => state.character.updateInventory);
	const [itemEl, setItemEl] = useState<null | HTMLElement>(null);
	const handleItemClose = () => setItemEl(null);
	const handleUse = () => {
		if (onUse && slot) {
			onUse(slot);
			console.log(slot);
		}
		handleItemClose();
	};

	const handleDiscardOne = () => {
		if (slot) {
			if (slot.quantity > 1) {
				discardOne({id: slot.id, quantity: slot.quantity - 1}).catch(console.error);
			} else {
				handleDiscardAll();
			}
		}
		handleItemClose();
	};

	const handleDiscardAll = () => {
		if (slot) {
			discardAll(slot);
		}
		handleItemClose();
	};

	const handleEquipping = () => {
		if (slot && getItemType(slot.roll.item) === ItemType.Equipment) {

		}
	};

	if (slot) {
		return <Fragment>
			<Menu
				keepMounted
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				anchorEl={itemEl}
				open={Boolean(itemEl)}
				onClose={handleItemClose}
			>
				{getItemType(slot.roll.item) == ItemType.Equipment && <MenuItem onClick={handleUse}>Equip</MenuItem>}
				{getItemType(slot.roll.item) == ItemType.Consumable && <MenuItem onClick={handleUse}>Use</MenuItem>}
				{slot.quantity > 1 && <MenuItem onClick={handleDiscardOne}>Discard One</MenuItem>}
				{slot.quantity > 1 && <MenuItem onClick={handleDiscardAll}>Discard All</MenuItem>}
				{slot.quantity === 1 && <MenuItem onClick={handleDiscardAll}>Discard</MenuItem>}
			</Menu>

			<Card variant="outlined" classes={{root: classes.itemSlotCard}}>
				<CardActionArea
					classes={{root: classes.itemSlotAction}}
					onClick={e => setItemEl(e.currentTarget.parentElement)}
				>
					<HtmlTooltip
						rarity={slot?.roll.item.rarity}
						title={<ItemInspect roll={slot.roll}/>}
					>
						<CardContent>
							<Badge
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								color='primary'
								invisible={slot.quantity <= 1}
								badgeContent={slot.quantity}
							>
								<CardMedia
									component="img"
									image={`/assets/items/${slot.roll.item.image}`}
									height={94}
								/>
							</Badge>
						</CardContent>
					</HtmlTooltip>
				</CardActionArea>
			</Card>
		</Fragment>;
	} else {
		return <Card variant="outlined" classes={{root: classes.itemSlotCard}}>
			<CardActionArea classes={{root: classes.itemSlotAction}}>
				<CardContent>
					<Typography>Slot</Typography>
				</CardContent>
			</CardActionArea>
		</Card>;
	}
};

const Hero: FunctionComponent = () => {
	const classes = useStyles();
	const currentHero = useStoreState(state => state.character.character);
	const items = useStoreState(state => state.character.inventory);
	const loadHero = useStoreActions(state => state.character.getMine);
	//const equipment = useStoreActions(state => state.character.)
	const addSnack = useStoreActions(state => state.notification.enqueue);
	const updateHero = useStoreActions(state => state.character.update);
	const consumeItem = useStoreActions(state => state.character.consumeItem);
	const nav = useNavigation();

	useMount(() => {
		if (!currentHero) {
			loadHero().then(() => {
				const hero = store.getState().character.character;
				if (!hero) {
					nav.navigate("/hero", {replace: true}).catch(console.error);
				}
			}).catch((e: any) => {
				console.error(e);
				nav.navigate("/", {replace: true}).catch(console.error);
			})
		}
	});

	const handleUse = (slot: CharacterInventory) => {
		if (currentHero) {
			const it = getItemType(slot.roll.item);
			switch (it) {
				case ItemType.Consumable:
					consumeItem(slot);
					break;
				case ItemType.Equipment:

			}
		}
	};

	if (!currentHero) {
		return <Fragment/>;
	}

	return <Grid container justify="center" spacing={2}>
		<Grid item lg={7}>
			<Card raised>
				<CardHeader title="Hero"/>
				<CardContent style={{padding: 8}}>
					<Grid container spacing={2}>
						<Grid container item direction="row" spacing={2} justify="center">
							<Grid container item lg={2} direction="column" spacing={2}>
								<Grid item>
									<EquipmentSlot
										name="Head"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Chest"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Belt"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Boot"
										slot={currentHero.equipment}
									/>
								</Grid>
							</Grid>

							<Grid item lg={6}>
								<Card style={{height: "100%"}} variant="outlined">
									<CardMedia
										component="img"
										height={"100%"}
										image={`/assets/avatar/${currentHero.avatar.filename}`}
										style={{backgroundSize: "cover"}}
									/>
								</Card>
							</Grid>

							<Grid container item lg={2} direction="column" spacing={2}>
								<Grid item>
									<EquipmentSlot
										name="Left Hand"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Right Hand"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 1"
										slot={currentHero.equipment}
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 2"
										slot={currentHero.equipment}
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid container item lg={12} justify="center" spacing={3}>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Neck"
									slot={currentHero.equipment}
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Bag"
									slot={currentHero.equipment}
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Artifact"
									slot={currentHero.equipment}
								/>
							</Grid>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>

		<Grid item lg={9}>
			<Card>
				<CardHeader title="Inventory"/>
				<CardContent>
					<GridList cols={10} cellHeight={128}>
						{[...Array(10).keys()].map(value => {
							if (value <= items.length - 1) {
								return <GridListTile key={value}>
									<InventorySlot
										slot={items[value]}
										onUse={handleUse}
									/>
								</GridListTile>;
							} else {
								return <GridListTile key={value}>
									<InventorySlot/>
								</GridListTile>;
							}
						})}
					</GridList>
				</CardContent>
			</Card>
		</Grid>
	</Grid>;
};

export default Hero;
