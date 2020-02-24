import {createElement, Fragment, FunctionComponent, useState} from "react";
import {
	Badge,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles, Divider,
	Grid,
	GridList,
	GridListTile,
	makeStyles,
	Menu,
	MenuItem,
	Theme, Tooltip,
	Typography,
	withStyles,
} from "@material-ui/core";
import {store, useStoreActions, useStoreState} from "../../store";
import {useNavigation} from "react-navi";
import {useMount} from "react-use";
import {CharacterEquipment, CharacterInventory, getItemType, Item, ItemRoll, ItemType} from "heroes-common/src";
import {EquipmentType} from "heroes-common/src/interfaces/equipment-type";

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
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 440,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip);

interface ItemInspectProps {
	iRoll: ItemRoll;
}

const ItemInspect: FunctionComponent<ItemInspectProps> = ({iRoll}) => {
	return <Fragment>
		<Typography color="inherit">
			<u>{iRoll.item.name}</u>
			<small><em> {iRoll.item.category.parent?.name} - {iRoll.item.category.name}</em></small>
		</Typography>
		<small>{iRoll.item.description}</small><Divider/>
		<ul>
			{iRoll.item.heal ? (<li><Typography variant="caption">{"Heals " + iRoll.item.heal + " Health points."}</Typography></li>):null}
			{iRoll.item.strengthMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.strengthMod * iRoll.strengthMult) + " Strength points."}</Typography></li>):null}
			{iRoll.item.dexterityMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.dexterityMod * iRoll.dexterityMult) + " Dexterity points."}</Typography></li>):null}
			{iRoll.item.vitalityMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.vitalityMod * iRoll.vitalityMult) + " Vitality points."}</Typography></li>):null}
			{iRoll.item.intellectMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.intellectMod * iRoll.intellectMult) + " Intellect points."}</Typography></li>):null}
			{iRoll.item.criticalChanceMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.criticalChanceMod * iRoll.criticalChanceMult) + "% chance of Critical Hit."}</Typography></li>):null}
			{iRoll.item.criticalDamageMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.criticalDamageMod * iRoll.criticalDamageMult) + "% damage on Critical Hits."}</Typography></li>):null}
			{iRoll.item.dodgeChanceMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.dodgeChanceMod * iRoll.dodgeChanceMult) + "% chance of Dodging attacks."}</Typography></li>):null}
			{iRoll.item.healthMod ? (<li><Typography variant="caption">{"Increases Max Health by " + (iRoll.item.healthMod * iRoll.healthMult) + "%."}</Typography></li>):null}
			{iRoll.item.manaMod ? (<li><Typography variant="caption">{"Increases Max Mana by " + (iRoll.item.manaMod * iRoll.manaMult) + "%."}</Typography></li>):null}
			{iRoll.item.damageMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.damageMod * iRoll.damageMult) + " points to Damage dealt."}</Typography></li>):null}
			{iRoll.item.itemDropMod ? (<li><Typography variant="caption">{"Adds " + (iRoll.item.itemDropMod * iRoll.itemDropMult) + "% chance of finding loot."}</Typography></li>):null}
			{iRoll.item.armorMod ? (<li><Typography variant="caption">{"Removes " + (iRoll.item.armorMod * iRoll.armorMult) + "% of damage taken."}</Typography></li>):null}
			{iRoll.item.goldDropMod ? (<li><Typography variant="caption">{"Gold rewards increased by " + (iRoll.item.goldDropMod * iRoll.goldDropMult) + "%."}</Typography></li>):null}
		</ul>
		{iRoll.item.stackLimit > 1 ? (<Fragment><Divider/>{"Stacks up to " + iRoll.item.stackLimit}</Fragment>):null}
	</Fragment>;
}

interface EquipmentSlotProps {
	name: string;
	slot?: CharacterEquipment;
	eqType: EquipmentType;
	onEquip?: (slot: CharacterEquipment) => void;
}

const EquipmentSlot: FunctionComponent<EquipmentSlotProps> = ({name, slot, eqType, onEquip}) => {
	const classes = useStyles();
	const [raised, setRaised] = useState(false);
	const failedCard = <Card raised={raised} classes={{root: classes.itemSlotCard}}>
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
		let eqItem: Item | null = null;

		switch (eqType) {
			case "Head":
				if (slot.headSlot) {
					eqItem = slot.headSlot.item;
				}
				break;
			case "Chest":
				if (slot.chestSlot) {
					eqItem = slot.chestSlot.item;
				}
				break;
			case "Belt":
				if (slot.beltSlot) {
					eqItem = slot.beltSlot.item;
				}
				break;
			case "Boot":
				if (slot.bootSlot) {
					eqItem = slot.bootSlot.item;
				}
				break;
			case "Left Hand":
				if (slot.leftHandSlot) {
					eqItem = slot.leftHandSlot.item;
				}
				break;
			case "Right Hand":
				if (slot.rightHandSlot) {
					eqItem = slot.rightHandSlot.item;
				}
				break;
			case "Ring 1":
				if (slot.ring1Slot) {
					eqItem = slot.ring1Slot.item;
				}
				break;
			case "Ring 2":
				if (slot.ring2Slot) {
					eqItem = slot.ring2Slot.item;
				}
				break;
			case "Neck":
				if (slot.neckSlot) {
					eqItem = slot.neckSlot.item;
				}
				break;
			case "Bag":
				if (slot.bagSlot) {
					eqItem = slot.bagSlot.item;
				}
				break;
			case "Artifact":
				if (slot.artifactSlot) {
					eqItem = slot.artifactSlot.item;
				}
				break;
			default:
				break;
		}
		if (eqItem) {
			return <Fragment>
				<Card raised={raised} classes={{root: classes.itemSlotCard}}>
					<CardActionArea
						classes={{root: classes.itemSlotAction}}
						onMouseEnter={() => setRaised(true)}
						onMouseLeave={() => setRaised(false)}
					>
						<CardContent>
							<CardMedia
								component="img"
								image={`/assets/items/${eqItem.image}`}
								height={94}
							/>
						</CardContent>
					</CardActionArea>
				</Card>
			</Fragment>;
		} else {
			return failedCard;
		}
	} else {
		return failedCard;
	}
};

interface InventorySlotProps {
	slot?: CharacterInventory;
	onUse?: (slot: CharacterInventory) => void;
}

const InventorySlot: FunctionComponent<InventorySlotProps> = ({slot, onUse}) => {
	const classes = useStyles();
	const discard = useStoreActions(state => state.character.deleteInventory);
	const [itemEl, setItemEl] = useState<null | HTMLElement>(null);
	const handleItemClose = () => setItemEl(null);
	const handleUse = () => {
		if (onUse && slot) {
			onUse(slot);
			console.log(slot);
		}
		handleItemClose();
	};
	const handleDiscard = () => {
		if (slot) {

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
				{
					getItemType(slot.roll.item) == ItemType.Equipment &&
					<MenuItem onClick={handleUse}>Equip</MenuItem>
				}
				{
					getItemType(slot.roll.item) == ItemType.Consumable &&
					<MenuItem onClick={handleUse}>Use</MenuItem>
				}
				<MenuItem onClick={handleItemClose}>Discard One</MenuItem>
				<MenuItem onClick={handleItemClose}>Discard All</MenuItem>
			</Menu>

			<Card variant="outlined" classes={{root: classes.itemSlotCard}}>
				<CardActionArea
					classes={{root: classes.itemSlotAction}}
					onClick={e => setItemEl(e.currentTarget.parentElement)}
				>
					<HtmlTooltip
						title={
							<ItemInspect iRoll={slot.roll}/>
						}
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
										eqType="Head"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Chest"
										slot={currentHero.equipment}
										eqType="Chest"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Belt"
										slot={currentHero.equipment}
										eqType="Belt"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Boot"
										slot={currentHero.equipment}
										eqType="Boot"
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
										eqType="Left Hand"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Right Hand"
										slot={currentHero.equipment}
										eqType="Right Hand"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 1"
										slot={currentHero.equipment}
										eqType="Ring 1"
									/>
								</Grid>
								<Grid item>
									<EquipmentSlot
										name="Ring 2"
										slot={currentHero.equipment}
										eqType="Ring 2"
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid container item lg={12} justify="center" spacing={3}>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Neck"
									slot={currentHero.equipment}
									eqType="Neck"
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Bag"
									eqType="Bag"
									slot={currentHero.equipment}
								/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot
									name="Artifact"
									slot={currentHero.equipment}
									eqType="Artifact"
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
								</GridListTile>
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
