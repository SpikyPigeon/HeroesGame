import {createElement, Fragment, FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	Grid,
	makeStyles,
	Mark,
	Slider,
	Switch,
	Theme,
	Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		zoomLabel: {
			marginRight: 25,
		},
		zoomGroup: {
			width: 240,
			marginRight: 20,
		},
		mapCard: {
			padding: 0,
			["&:last-child"]: {
				paddingBottom: 0,
			},
		},
		infoCard: {
			padding: 5,
			["&:last-child"]: {
				paddingBottom: 5,
			},
		},
		infoText: {
			margin: 0,
		},
		canvas: {
			width: "100%",
			height: 400,
		},
	}),
);

const MapCard: FunctionComponent = () => {
	let canvas = useRef<HTMLCanvasElement>(null);
	const classes = useStyles();
	const [zoom, setZoom] = useState(1.0);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [navMode, setNavMode] = useState(false);
	const [raised, setRaised] = useState(false);

	const render = (canvas: HTMLCanvasElement) => {
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.clearRect(0, 0, rect.width, rect.height);

			ctx.save();
			ctx.scale(zoom, zoom);
			ctx.translate(offsetX, offsetY);

			ctx.beginPath();
			for (let y = 0; y < 32; ++y) {
				for (let x = 0; x < 40; ++x) {
					ctx.rect(x * 32, y * 32, 32, 32);
				}
			}

			ctx.strokeStyle = "black";
			ctx.lineWidth = 0.5;
			ctx.stroke();
			ctx.restore();
		}
	};

	const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode) {
			setDragging(true);
			console.log("Dragging started");
		}
	};

	const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode) {
			setDragging(false);
			console.log("Dragging ended");
		}
	};

	const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode && canvas.current && dragging) {
			setOffsetX(offsetX + e.movementX);
			setOffsetY(offsetY + e.movementY);
			render(canvas.current);
		}
	};

	const click = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (e.button === 0 && !navMode && !dragging) {
			console.log("CLICKED!");
		}
	};

	const onResize = () => {
		if (canvas.current) {
			render(canvas.current);
		}
	};

	useEffect(() => {
		console.log("Home rendered");
		if (canvas.current) {
			render(canvas.current);

			window.addEventListener("resize", onResize);
			return () => window.removeEventListener("resize", onResize);
		}

		return () => {
		};
	}, []);

	const marks: Mark[] = [
		{value: 0.5, label: "50%"},
		{value: 1.0, label: "100%"},
		{value: 1.5, label: "150%"},
	];

	return <Card raised={raised}>
		<CardActionArea onMouseEnter={() => setRaised(true)} onMouseLeave={() => setRaised(false)} disableRipple>
			<CardHeader title="World" action={
				<FormGroup row>
					<FormControlLabel label="Zoom" labelPlacement="start"
					                  classes={{root: classes.zoomGroup, label: classes.zoomLabel}}
					                  control={
						                  <Slider
							                  color="secondary" min={0.5} max={1.5} step={0.1}
							                  marks={marks} valueLabelDisplay="off" value={zoom}
							                  onChange={(e, value) => {
								                  if (typeof value === "number" && canvas.current) {
									                  setZoom(value);
									                  render(canvas.current);
								                  }
							                  }}
						                  />
					                  }
					/>
					<FormControlLabel
						label="Navigation Mode"
						labelPlacement="start"
						control={
							<Switch
								color="secondary" value={navMode}
								onChange={e => {
									setNavMode(e.target.checked);
									setDragging(false);
								}}
							/>
						}
					/>
				</FormGroup>
			}
			/>
			<CardContent classes={{root: classes.mapCard}}>
				<canvas
					ref={canvas} className={classes.canvas}
					onMouseLeave={() => setDragging(false)} onClick={click}
					onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}
				/>
			</CardContent>
		</CardActionArea>
	</Card>;
};

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
	const [open, setOpen] = useState({
		players: false,
		death: true,
	});
	const [raised, setRaised] = useState({
		location: false,
		players: false,
	});

	return <Fragment>
		<Grid container alignItems="center" justify="center" spacing={2}>
			<Grid item lg={9}>
				<MapCard/>
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
										Location : Isandiel @ 1.1
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
