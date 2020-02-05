import {createElement, Fragment, FunctionComponent, useEffect, useState} from "react";
import {useNavigation} from "react-navi";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	makeStyles,
	Theme,
	Typography
} from "@material-ui/core";

import {useStoreActions, useStoreState} from "../../store";
import {WorldMapCard} from "./world.map";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		infoCard: {
			padding: 5,
			["&:last-child"]: {
				paddingBottom: 5,
			},
		},
		infoText: {
			margin: 0,
		},
	}),
);

interface MyDialogProps {
	open: boolean;
	onClose: () => void;
}

const PlayerListDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;

	const handleClose = (e: {}, reason: string) => {
		onClose();
	};

	return <Dialog open={open} onClose={handleClose} scroll="body" fullWidth maxWidth="md">
		<DialogTitle>Players at Isandiel @ 1.1</DialogTitle>
		<DialogContent>
			<DialogContentText>
				You have 3 PvP Attacks left today
			</DialogContentText>

			<Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={2}>
				{[...Array(37).keys()].map(value => (
					<Grid item lg key={value}>
						<Card style={{width: 128, height: 128}}>
							<CardActionArea style={{height: "100%"}}>
								<CardContent>
									<Typography variant="body1">Player {value + 1}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</DialogContent>
	</Dialog>;
};

const DeathDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;

	const onResurect = () => {
		onClose();
	};

	return <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth disableBackdropClick disableEscapeKeyDown>
		<DialogTitle style={{textAlign: "center"}}>You are Dead</DialogTitle>
		<DialogContent style={{
			height: 550,
			backgroundImage: "url('/assets/death-angel.png')",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "bottom",
		}}/>
		<DialogActions>
			<Button color="primary" variant="contained" fullWidth onClick={onResurect}>Resurect</Button>
		</DialogActions>
	</Dialog>;
};

const World: FunctionComponent = () => {
	const classes = useStyles();
	const nav = useNavigation();
	const [open, setOpen] = useState({
		players: false,
		death: false,
	});
	const [raised, setRaised] = useState({
		location: false,
		players: false,
	});

	const loadChar = useStoreActions(state => state.character.getMine);
	const loadWorld = useStoreActions(state => state.world.load);
	const currentWorld = useStoreState(state => state.world.current);
	const currentChar = useStoreState(state => state.character.character);

	useEffect(() => {
		if (!currentChar) {
			loadChar().catch((e: any) => {
				console.error(e);
				nav.navigate("/", {replace: true});
			});
		}
	}, []);

	useEffect(() => {
		if (currentChar && !currentWorld) {
			console.log(currentChar);
			loadWorld(currentChar.square.world.id).catch(console.error);
		}
	}, [currentChar]);

	return <Fragment>
		<Grid container alignItems="center" justify="center" spacing={2}>
			<Grid item lg={9}>
				<WorldMapCard character={currentChar} world={currentWorld} onMove={(x, y) => {
					console.log(`MOVE@${x}.${y}`);
				}}/>
			</Grid>
			<Grid container item lg={9} spacing={1}>
				<Grid item lg={8}>
					<Card style={{height: "100%"}}/>
				</Grid>
				<Grid container item lg={4} direction="column" spacing={1}>
					<Grid item lg>
						<Card raised={raised.location}>
							<CardActionArea
								onMouseEnter={() => setRaised({
									location: true,
									players: false,
								})}
								onMouseLeave={() => setRaised({
									location: false,
									players: false,
								})}
							>
								<CardContent classes={{root: classes.infoCard}}>
									<Typography paragraph className={classes.infoText}>
										Location
										: {currentWorld?.world.name} @ {currentChar?.square.x}.{currentChar?.square.y}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					<Grid item lg>
						<Card raised={raised.players}>
							<CardActionArea
								onMouseEnter={() => setRaised({
									location: false,
									players: true,
								})}
								onMouseLeave={() => setRaised({
									location: false,
									players: false,
								})}
								onClick={() => setOpen({
									players: true,
									death: false,
								})}
							>
								<CardContent classes={{root: classes.infoCard}}>
									<Typography paragraph className={classes.infoText}>
										There are 37 players here
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
		<PlayerListDialog open={open.players}
		                  onClose={() => setOpen({
			                  players: false,
			                  death: false,
		                  })}
		/>
		<DeathDialog open={open.death}
		             onClose={() => setOpen({
			             players: false,
			             death: false,
		             })}
		/>
	</Fragment>;
};

export default World;
