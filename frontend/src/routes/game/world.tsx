import {createElement, Fragment, FunctionComponent, useEffect, useState} from "react";
import {blue, green, red} from "@material-ui/core/colors";
import {AddSharp, RemoveSharp} from "@material-ui/icons";
import {useNavigation} from "react-navi";
import {useMount} from "react-use";
import {
	Button,
	ButtonGroup,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	CardMedia,
	CircularProgress,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	makeStyles,
	Theme,
	Tooltip,
	Typography
} from "@material-ui/core";

import {config, Encounter, PlayerCharacter, Structure} from "heroes-common";
import {LocationInfo, store, useStoreActions, useStoreState} from "../../store";
import {FeatureCard} from "./world.feature";
import {WorldAction} from "./world.combat";
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
		healthCircle: {
			color: red["800"],
		},
		manaCircle: {
			color: blue["800"],
		},
		energyCircle: {
			color: green["800"],
		},
	}),
);

interface MyDialogProps {
	open: boolean;
	onClose: () => void;
}

const PlayerListDialog: FunctionComponent<MyDialogProps & { players: Array<PlayerCharacter>, location: { world: string, x: number, y: number } }> = props => {
	const {open, onClose, players, location} = props;

	const handleClose = () => {
		onClose();
	};

	return <Dialog open={open} onClose={handleClose} scroll="body" fullWidth maxWidth="md">
		<DialogTitle>Players at {location.world} @ {location.x}.{location.y}</DialogTitle>
		<DialogContent>
			<DialogContentText>
				You have 3 PvP Attacks left today
			</DialogContentText>

			<Grid container direction="row" justify="space-evenly" alignItems="flex-start" spacing={2}>
				{players.map((value, id) => {
					if (value.isActive && !value.isDead) {
						return <Grid item lg key={id}>
							<Card style={{width: 128}}>
								<CardActionArea style={{height: "100%"}}>
									<CardHeader title={value.name}/>
									<CardMedia
										component="img"
										image={`/assets/avatar/${value.avatar.filename}`}
										height={128}
									/>
								</CardActionArea>
							</Card>
						</Grid>;
					} else {
						return <Fragment key={id}/>;
					}
				})}
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

const LevelUpDIalog: FunctionComponent<MyDialogProps & { character: PlayerCharacter | null }> = props => {
	const charStats = config.character.stats;
	const {open, onClose, character} = props;
	const [str, setStr] = useState<number>(character?.strength ?? 0);
	const [dex, setDex] = useState<number>(character?.dexterity ?? 0);
	const [vit, setVit] = useState<number>(character?.vitality ?? 0);
	const [int, setInt] = useState<number>(character?.intellect ?? 0);

	const updateChar = useStoreActions(state => state.character.update);

	const onSubmit = () => {
		updateChar({
			strength: str,
			dexterity: dex,
			vitality: vit,
			intellect: int,
			experience: (character?.experience ?? 1000) - 1000,
			currentHealth: charStats.calculate.health(vit, 0),
			currentMana: charStats.calculate.mana(int, 0),
			currentEnergy: 200 + (character?.level ?? 1) * 10,
			level: (character?.level ?? 1) + 1,
		});
		onClose();
	};

	if (!character) {
		return null;
	}

	const getPointsLeft = () => charStats.levelPoints - (str - character.strength) - (dex - character.dexterity) - (vit - character.vitality) - (int - character.intellect);

	return <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth disableBackdropClick disableEscapeKeyDown>
		<DialogTitle style={{textAlign: "center"}}>Level Up!</DialogTitle>
		<DialogContent>
			<Grid container direction="column" justify="space-evenly" alignContent="stretch">
				<Grid item lg>
					<Grid item>
						<Typography align="center" gutterBottom>Stat Points Left :</Typography>
					</Grid>
					<Grid item>
						<Typography align="center" variant="h4"> {getPointsLeft()}</Typography>
					</Grid>
				</Grid>
				<Grid item lg>
					<Typography variant="h6" gutterBottom>Strength</Typography>
					<ButtonGroup variant="contained" color="primary" fullWidth>
						<Button onClick={() => setStr(str - 1)} disabled={str === character.strength}>
							<RemoveSharp/>
						</Button>
						<Button disabled style={{color: "black"}}>
							{str}
						</Button>
						<Button onClick={() => setStr(str + 1)} disabled={getPointsLeft() === 0}>
							<AddSharp/>
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item lg>
					<Typography variant="h6" gutterBottom>Dexterity</Typography>
					<ButtonGroup variant="contained" color="primary" fullWidth>
						<Button onClick={() => setDex(dex - 1)} disabled={dex === character.dexterity}>
							<RemoveSharp/>
						</Button>
						<Button disabled style={{color: "black"}}>
							{dex}
						</Button>
						<Button onClick={() => setDex(dex + 1)} disabled={getPointsLeft() === 0}>
							<AddSharp/>
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item lg>
					<Typography variant="h6" gutterBottom>Vitality</Typography>
					<ButtonGroup variant="contained" color="primary" fullWidth>
						<Button onClick={() => setVit(vit - 1)} disabled={vit === character.vitality}>
							<RemoveSharp/>
						</Button>
						<Button disabled style={{color: "black"}}>
							{vit}
						</Button>
						<Button onClick={() => setVit(vit + 1)} disabled={getPointsLeft() === 0}>
							<AddSharp/>
						</Button>
					</ButtonGroup>
				</Grid>
				<Grid item lg>
					<Typography variant="h6" gutterBottom>Intellect</Typography>
					<ButtonGroup variant="contained" color="primary" fullWidth>
						<Button onClick={() => setInt(int - 1)} disabled={int === character.intellect}>
							<RemoveSharp/>
						</Button>
						<Button disabled style={{color: "black"}}>
							{int}
						</Button>
						<Button onClick={() => setInt(int + 1)} disabled={getPointsLeft() === 0}>
							<AddSharp/>
						</Button>
					</ButtonGroup>
				</Grid>
			</Grid>
		</DialogContent>
		<DialogActions>
			<Button color="secondary" variant="contained" fullWidth
			        disabled={getPointsLeft() > 0}
			        onClick={onSubmit}
			>
				Level Up
			</Button>
		</DialogActions>
	</Dialog>;
};

const World: FunctionComponent = () => {
	const classes = useStyles();
	const nav = useNavigation();
	const [open, setOpen] = useState({
		players: false,
		death: false,
		level: false,
	});
	const [raised, setRaised] = useState({
		location: false,
		players: false,
		status: false,
	});
	const [charsAtLocation, setCharsAtLocation] = useState<Array<PlayerCharacter>>([]);
	const [encounters, setEncounters] = useState<Array<Encounter>>([]);
	const [structures, setStructures] = useState<Array<Structure>>([]);
	const [location, setLocation] = useState<LocationInfo | null>(null);
	const [playing, setPlaying] = useState(false);

	const loadChar = useStoreActions(state => state.character.getMine);
	const updateChar = useStoreActions(state => state.character.update);
	const loadWorld = useStoreActions(state => state.world.load);
	const loadSquare = useStoreActions(state => state.world.loadSquareContent);
	const moveChar = useStoreActions(state => state.character.moveTo);
	const currentWorld = useStoreState(state => state.world.current);
	const currentChar = useStoreState(state => state.character.character);
	const addSnack = useStoreActions(state => state.notification.enqueue);

	const {character: charConfig} = config;

	const loadContent = () => {
		if (location) {
			loadSquare(location).then(content => {
				setCharsAtLocation(content.players);
				setEncounters(content.encounters);
				setStructures(content.structures);
			}, console.error);
		}
	};

	useMount(() => {
		loadChar().then(() => {
			if (!store.getState().character.character) {
				nav.navigate("/hero", {replace: true}).catch(console.error);
			}
		}, (e: any) => {
			console.error(e);
			nav.navigate("/", {replace: true}).catch(console.error);
		});
	});

	useEffect(() => {
		if (currentChar) {
			const {square} = currentChar;
			setPlaying(true);

			if (!currentWorld) {
				loadWorld(currentChar.square.world.id).catch(console.error);
			}

			if (!location || location.worldId !== square.world.id || location.x !== square.x || location.y !== square.y) {
				setLocation({
					worldId: square.world.id,
					x: square.x,
					y: square.y,
				});
			}

			if (currentChar.isDead) {
				setOpen({
					players: false,
					death: true,
					level: false,
				});
			}

			if (!currentChar.isDead && open.death) {
				setOpen({
					players: false,
					death: false,
					level: false,
				});
			}

			if (currentChar.experience >= 1000) {
				setOpen({
					players: false,
					death: false,
					level: true,
				});
			}
		}

		if (!currentChar && playing) {
			nav.navigate("/hero", {replace: true}).catch(console.error);
		}
	}, [currentChar]);

	useEffect(() => {
		loadContent();
	}, [location]);

	if (!currentChar) {
		return null;
	}

	return <Fragment>
		<Grid container alignItems="center" justify="center" spacing={2}>
			<Grid item lg={9}>
				<WorldMapCard character={currentChar} world={currentWorld} onMove={(x, y) => {
					if (currentChar) {
						if (currentChar.square.x == x && currentChar.square.y == y) {
							console.log("Moving in place, are we?");
						} else {
							moveChar({
								worldId: currentChar.square.world.id,
								x,
								y,
							});
						}
					}
				}}/>
			</Grid>
			<Grid container item lg={9} spacing={1}>
				<Grid item lg={9}>
					<FeatureCard structures={structures}/>
					<WorldAction encounters={encounters}/>
				</Grid>
				<Grid item lg={3}>
					<Card raised={raised.status} style={{marginBottom: "0.6rem"}}>
						<CardActionArea
							onMouseEnter={() => setRaised({
								location: false,
								players: false,
								status: true,
							})}
							onMouseLeave={() => setRaised({
								location: false,
								players: false,
								status: false,
							})}
						>
							<CardContent classes={{root: classes.infoCard}}>
								<Grid container justify="space-evenly" direction="row">
									<Grid item lg={2} style={{textAlign: "center"}}>
										<Tooltip arrow placement="top"
										         title={`Health : ${currentChar.currentHealth} / ${charConfig.stats.calculate.health(currentChar.vitality, 0)}`}
										>
											<CircularProgress variant="static" thickness={18}
											                  classes={{circle: classes.healthCircle}}
											                  value={currentChar.currentHealth * 100 / charConfig.stats.calculate.health(currentChar.vitality, 0)}
											/>
										</Tooltip>
									</Grid>
									<Grid item lg={2} style={{textAlign: "center"}}>
										<Tooltip arrow placement="top"
										         title={`Mana : ${currentChar.currentMana} / ${charConfig.stats.calculate.mana(currentChar.intellect, 0)}`}
										>
											<CircularProgress variant="static" thickness={18}
											                  classes={{circle: classes.manaCircle}}
											                  value={currentChar.currentMana * 100 / charConfig.stats.calculate.mana(currentChar.intellect, 0)}
											/>
										</Tooltip>
									</Grid>
									<Grid item lg={2} style={{textAlign: "center"}}>
										<Tooltip arrow placement="top"
										         title={`Energy : ${currentChar.currentEnergy} / ${200 + 10 * (currentChar.level - 1)}`}
										>
											<CircularProgress variant="static" thickness={18}
											                  classes={{circle: classes.energyCircle}}
											                  value={currentChar.currentEnergy * 100 / (200 + 10 * (currentChar.level - 1))}
											/>
										</Tooltip>
									</Grid>
								</Grid>
							</CardContent>
						</CardActionArea>
					</Card>
					<Card raised={raised.location} style={{marginBottom: "0.6rem"}}>
						<CardActionArea
							onMouseEnter={() => setRaised({
								location: true,
								players: false,
								status: false,
							})}
							onMouseLeave={() => setRaised({
								location: false,
								players: false,
								status: false,
							})}
						>
							<CardContent classes={{root: classes.infoCard}}>
								<Typography paragraph className={classes.infoText}>
									Location:&nbsp;
									{currentWorld?.world.name} @ {currentChar?.square.x}.{currentChar?.square.y}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
					<Card raised={raised.players}>
						<CardActionArea
							onMouseEnter={() => setRaised({
								location: false,
								players: true,
								status: false,
							})}
							onMouseLeave={() => setRaised({
								location: false,
								players: false,
								status: false,
							})}
							onClick={() => setOpen({
								players: true,
								death: false,
								level: false,
							})}
						>
							<CardContent classes={{root: classes.infoCard}}>
								<Typography paragraph className={classes.infoText}>
									There are {charsAtLocation.length} players here
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			</Grid>
		</Grid>
		<PlayerListDialog open={open.players}
		                  onClose={() => setOpen({
			                  players: false,
			                  death: false,
			                  level: false,
		                  })}
		                  players={charsAtLocation}
		                  location={{
			                  world: currentWorld?.world.name ?? "",
			                  x: currentChar?.square.x ?? 0,
			                  y: currentChar?.square.y ?? 0,
		                  }}
		/>
		<DeathDialog open={open.death}
		             onClose={() => {
			             loadContent();
			             updateChar({
				             currentHealth: charConfig.stats.calculate.health(currentChar.vitality, 0),
				             experience: currentChar.experience - Math.ceil(currentChar.experience * 0.1),
			             });
			             setOpen({
				             players: false,
				             death: false,
				             level: false,
			             });
		             }}
		/>
		<LevelUpDIalog open={open.level}
		               onClose={() => setOpen({
			               players: false,
			               death: false,
			               level: false,
		               })}
		               character={currentChar}
		/>
	</Fragment>;
};

export default World;
