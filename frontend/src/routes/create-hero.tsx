import {createElement, FunctionComponent, useEffect, useState} from "react";
import {AddSharp, RemoveSharp} from "@material-ui/icons";
import {green} from "@material-ui/core/colors";
import {useNavigation} from "react-navi";
import {
	Button,
	ButtonGroup,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	createStyles,
	Grid,
	GridList,
	GridListTile,
	makeStyles,
	styled,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";

import {Avatar, config} from "heroes-common";
import {useStoreActions} from "../store";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			position: "relative",
			height: "100%",
			backgroundColor: "rgba(255, 255, 255, 0.65)",
			maxHeight: window.innerHeight - theme.spacing(12) * 2,
		},
		avatarCard: {
			height: "100%",
			backgroundColor: "rgba(255, 255, 255, 0.5)",
		},
	}),
);

const Content = styled("div")(({theme}) => ({
	flexGrow: 1,
	padding: theme.spacing(12),
	backgroundImage: "url('/assets/create-hero-background.jpg')",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "bottom",
	minHeight: "100vh",
}));

const CreateHero: FunctionComponent = () => {
	const charStats = config.character.stats;
	const classes = useStyles();
	const nav = useNavigation();
	const [avatar, setAvatar] = useState<number | boolean>(false);
	const [avatarList, setAvatarList] = useState<Array<Avatar>>([]);
	const [name, setName] = useState("");
	const [str, setStr] = useState(charStats.start);
	const [dex, setDex] = useState(charStats.start);
	const [vit, setVit] = useState(charStats.start);
	const [int, setInt] = useState(charStats.start);

	const listAvatars = useStoreActions(state => state.character.listAvatars);
	const createChar = useStoreActions(state => state.character.create);
	const updateChar = useStoreActions(state => state.character.update);
	const hasChar = useStoreActions(state => state.character.userHasChar);

	useEffect(() => {
		const request = async () => {
			if (!await hasChar()) {
				setAvatarList(await listAvatars());
			} else {
				await nav.navigate("/game");
			}
		};
		request().catch(console.error);
	}, []);

	const getPointsLeft = () => charStats.startPoints - (str - charStats.start) - (dex - charStats.start) - (vit - charStats.start) - (int - charStats.start);

	return <Content>
		<Card variant="outlined" classes={{root: classes.card}}>
			<CardHeader title="Create your Hero"/>
			<CardContent>
				<Grid container direction="row" spacing={2}>
					<Grid container item lg={3} direction="column" spacing={4}>
						<Grid item lg>
							<Typography gutterBottom>Stat Points Left : {getPointsLeft()}</Typography>
						</Grid>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Strength</Typography>
							<ButtonGroup variant="contained" color="primary" fullWidth>
								<Button onClick={() => setStr(str - 1)} disabled={str === charStats.start}>
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
							<Typography variant="caption" gutterBottom>Dexterity</Typography>
							<ButtonGroup variant="contained" color="primary" fullWidth>
								<Button onClick={() => setDex(dex - 1)} disabled={dex === charStats.start}>
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
							<Typography variant="caption" gutterBottom>Vitality</Typography>
							<ButtonGroup variant="contained" color="primary" fullWidth>
								<Button onClick={() => setVit(vit - 1)} disabled={vit === charStats.start}>
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
							<Typography variant="caption" gutterBottom>Intellect</Typography>
							<ButtonGroup variant="contained" color="primary" fullWidth>
								<Button onClick={() => setInt(int - 1)} disabled={int === charStats.start}>
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
					<Grid item lg={6}>
						<Card raised classes={{root: classes.avatarCard}}>
							<CardHeader title="Choose your Avatar"/>
							<CardContent>
								<TextField margin="dense" label="Name" fullWidth value={name}
								           onChange={e => setName(e.target.value)}/>
								<GridList cellHeight={128} cols={5} style={{maxHeight: "45vh", overflow: "auto"}}>
									{avatarList.map(value => (
										<GridListTile key={value.id}>
											<Card variant="outlined"
											      style={{
												      height: "100%",
												      backgroundColor: avatar === value.id ? green[300] : "white",
											      }}
											>
												<CardActionArea
													style={{height: "100%"}}
													onClick={() => setAvatar(value.id)}
												>
													<CardMedia
														component="img"
														image={`/assets/avatar/${value.filename}`}
														height={128}
													/>
												</CardActionArea>
											</Card>
										</GridListTile>
									))}
								</GridList>
							</CardContent>
						</Card>
					</Grid>
					<Grid container item lg={3} direction="column" spacing={4}>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Damage</Typography>
							<Typography variant="body1">
								{charStats.calculate.damage(str, 0).min} - {charStats.calculate.damage(str, 0).max}
							</Typography>
						</Grid>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Health</Typography>
							<Typography variant="body1">{charStats.calculate.health(vit, 0)}</Typography>
						</Grid>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Mana</Typography>
							<Typography variant="body1">{charStats.calculate.mana(int, 0)}</Typography>
						</Grid>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Dodge Chance</Typography>
							<Typography
								variant="body1">{charStats.calculate.dodgeChance(dex, 0).toPrecision(4)}%</Typography>
						</Grid>
						<Grid item lg>
							<Typography variant="caption" gutterBottom>Critical Chance</Typography>
							<Typography
								variant="body1">{charStats.calculate.criticalChance(dex, 0).toPrecision(4)}%</Typography>
						</Grid>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions style={{position: "absolute", bottom: 0, width: "100%"}}>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					disabled={getPointsLeft() > 0 || avatar === false || name === ""}
					onClick={async () => {
						if (typeof avatar === "number") {
							await createChar({
								avatarId: avatar,
								name,
							});
							await updateChar({
								strength: str,
								dexterity: dex,
								vitality: vit,
								intellect: int,
								currentHealth: charStats.calculate.health(vit, 0),
								currentMana: charStats.calculate.mana(int, 0),
							});
							await nav.navigate("/game");
						}
					}}
				>
					Create
				</Button>
			</CardActions>
		</Card>
	</Content>;
};

export default CreateHero;
