import {createElement, forwardRef, Fragment, FunctionComponent, MouseEvent, useEffect, useState} from "react";
import {
	Badge,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Grid,
	GridList,
	GridListTile,
	makeStyles, Menu, MenuItem,
	Theme,
	Typography
} from "@material-ui/core";
import {store, useStoreActions, useStoreState} from "../../store";
import {useLinkProps, useNavigation} from "react-navi";
import {useList, useMount} from "react-use";
import {CharacterInventory, config, getItemType, Item, ItemRoll, ItemType} from "heroes-common/src";

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

interface EquipmentSlotProps {
	name: string;
}

interface AppMenuLinkProps {
	text: string;
	href: string;
	onClick: () => void;
}

const AppMenuLink = forwardRef<any, AppMenuLinkProps>((props, ref) => {
	const {text, href} = props;
	const {onClick, ...linkProps} = useLinkProps({href});

	return <MenuItem
		ref={ref}
		component="a"
		onClick={(e: MouseEvent<HTMLAnchorElement>) => {
			props.onClick();
			onClick(e);
		}}
		{...linkProps}
	>
		{text}
	</MenuItem>;
});

const EquipmentSlot: FunctionComponent<EquipmentSlotProps> = props => {
	const {name} = props;
	const classes = useStyles();
	const [raised, setRaised] = useState(false);

	return <Card raised={raised} classes={{root: classes.itemSlotCard}}>
		<CardActionArea
			classes={{root: classes.itemSlotAction}}
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() => setRaised(false)}
		>
			<CardContent>
				<Typography>{name}</Typography>
			</CardContent>
		</CardActionArea>
	</Card>
};

interface InventorySlotProps {
	slot?: CharacterInventory;
	onUse?: (slot: CharacterInventory) => void;
}

const InventorySlot: FunctionComponent<InventorySlotProps> = ({slot, onUse}) => {
	const classes = useStyles();
	const [itemEl, setItemEl] = useState<null | HTMLElement>(null);
	const handleItemClose = () => setItemEl(null);
	const handleUse = () => {
		if (onUse && slot) {
			onUse(slot);
			console.log(slot);
		}

		handleItemClose();
	};

	if (slot) {
		return <Fragment>
			<Card variant="outlined" classes={{root: classes.itemSlotCard}}>
				<Menu
					keepMounted
					anchorEl={itemEl}
					open={Boolean(itemEl)}
					onClose={handleItemClose}
				>
					{getItemType(slot.roll.item) == ItemType.Equipment &&
					<AppMenuLink text="Equip" href="/game/hero" onClick={handleUse}/>}
					{getItemType(slot.roll.item) == ItemType.Consumable &&
					<AppMenuLink text="Use" href="/game/hero" onClick={handleUse}/>}
					<AppMenuLink text="Discard" href="/game/hero" onClick={handleItemClose}/>
				</Menu>
				<CardActionArea classes={{root: classes.itemSlotAction}} onClick={e => setItemEl(e.currentTarget)}>
					<CardContent>
						<Badge
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							color='primary'
							invisible={false}
							badgeContent={slot.quantity}
						>
							<CardMedia
								component="img"
								image={`/assets/items/${slot.roll.item.image}`}
								height={128}
							/>
						</Badge>
					</CardContent>
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
	const loadHero = useStoreActions(state => state.character.getMine);
	const loadItems = useStoreActions(state => state.character.findInventory);
	const addSnack = useStoreActions(state => state.notification.enqueue);
	const updateHero = useStoreActions(state => state.character.update);
	const nav = useNavigation();
	const [items, itemMod] = useList<CharacterInventory>([]);

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

	useEffect(() => {
		if (currentHero) {
			loadItems(currentHero.id).then(value => {
				itemMod.clear();
				itemMod.push(...value);
			}).catch(console.error);
		}
	}, [currentHero]);

	const handleUse = (slot: CharacterInventory) => {
		if (currentHero) {
			const it = getItemType(slot.roll.item);
			switch (it) {
				case ItemType.Consumable:
					if (slot.roll.item.heal > 0) {
						const maxHp = config.character.stats.calculate.health(currentHero.vitality, 0);
						const oldHp = currentHero.currentHealth;
						if (oldHp === maxHp) {
							addSnack({
								message: "Your health is already maxed!",
								options: {
									variant: "warning"
								}
							})
						} else if ((maxHp - oldHp) < slot.roll.item.heal) {
							updateHero({
								currentHealth: maxHp,
							});
							addSnack({
								message: "You gained " + (maxHp - oldHp) + " health points. Your health is fully restored!",
								options: {
									variant: "success"
								}
							});
						} else {
							updateHero({
								currentHealth: oldHp + slot.roll.item.heal,
							});
							addSnack({
								message: "You gained " + (slot.roll.item.heal) + " health points. " + (currentHero.currentHealth === maxHp && "Your health is fully restored!"),
								options: {
									variant: "success"
								}
							});
						}
					}
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
									<EquipmentSlot name="Head"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Chest"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Belt"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Boot"/>
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
									<EquipmentSlot name="Left Hand"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Right Hand"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Ring 1"/>
								</Grid>
								<Grid item>
									<EquipmentSlot name="Ring 2"/>
								</Grid>
							</Grid>
						</Grid>

						<Grid container item lg={12} justify="center" spacing={3}>
							<Grid item lg={2}>
								<EquipmentSlot name="Neck"/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot name="Bag"/>
							</Grid>
							<Grid item lg={2}>
								<EquipmentSlot name="Artifact"/>
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
