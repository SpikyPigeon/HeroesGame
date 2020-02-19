import {createElement, Fragment, FunctionComponent, useEffect, useState} from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Grid,
	GridList,
	GridListTile,
	makeStyles,
	Theme,
	Typography
} from "@material-ui/core";
import {useStoreActions, useStoreState} from "../../store";
import {useNavigation} from "react-navi";
import {useList} from "react-use";
import {CharacterInventory, ItemRoll} from "heroes-common/src";

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
	roll?: ItemRoll;
	quantity?: number;
}

const InventorySlot: FunctionComponent<InventorySlotProps> = ({roll, quantity}) => {
	const classes = useStyles();

	if(!roll || !quantity){
		return <Card variant="outlined" classes={{root: classes.itemSlotCard}}>
			<CardActionArea classes={{root: classes.itemSlotAction}}>
				<CardContent>
					<Typography>Slot</Typography>
				</CardContent>
			</CardActionArea>
		</Card>;
	}
	else{
		return <Card variant="outlined" classes={{root: classes.itemSlotCard}}>
			<CardActionArea classes={{root: classes.itemSlotAction}}>
				<CardContent>
					<CardMedia
						component="img"
						image={`/assets/items/${roll?.item.image}`}
						height={128}
					/>
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
	const nav = useNavigation();
	const [items, itemMod] = useList<CharacterInventory>([]);

	useEffect(() => {
		const req = async () => {
			await loadHero();
			if (!currentHero) {
				await nav.navigate("/");
			}
			else{
				itemMod.push(...await loadItems(currentHero.id));
			}
		};
		req().catch(console.error);
	}, []);

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
							if(items.length - 1 >= value){
								return <GridListTile key={value}>
									<InventorySlot
										roll={items[value].roll}
										quantity={items[value].quantity}
									/>
								</GridListTile>
							}
							else{
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
