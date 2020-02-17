import {createElement, Fragment, FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	createStyles,
	FormControlLabel,
	FormGroup,
	makeStyles,
	Mark,
	Slider,
	Switch,
	Theme,
	useTheme
} from "@material-ui/core";

import {PlayerCharacter} from "heroes-common";
import {WorldData} from "../../store/world";

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
		canvas: {
			width: "100%",
			height: 400,
		},
	}),
);

interface WorldMapProps {
	character: PlayerCharacter | null;
	world: WorldData | null;
	onMove: (x: number, y: number) => void;
}

export const WorldMapCard: FunctionComponent<WorldMapProps> = props => {
	let canvas = useRef<HTMLCanvasElement>(null);
	const {character, world, onMove} = props;
	const classes = useStyles();
	const theme = useTheme();
	const [zoom, setZoom] = useState(1.0);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [navMode, setNavMode] = useState(false);
	const [raised, setRaised] = useState(false);
	const [transform, setTransform] = useState<DOMMatrix>(new DOMMatrix());
	const [images, setImages] = useState({
		"cabin.png": new Image(32, 32),
		"camp.png": new Image(32, 32),
		"castle1.png": new Image(32, 32),
		"castle2.png": new Image(32, 32),
		"cave.png": new Image(32, 32),
		"dungeon.png": new Image(32, 32),
		"house.png": new Image(32, 32),
		"old-tower.png": new Image(32, 32),
		"temple.png": new Image(32, 32),
	});

	const render = (canvas: HTMLCanvasElement) => {
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;

		const ctx = canvas.getContext("2d");
		if (ctx && world && character) {
			const {x: cX, y: cY} = character.square;
			ctx.clearRect(0, 0, rect.width, rect.height);

			ctx.save();
			ctx.scale(zoom, zoom);
			ctx.translate(offsetX, offsetY);
			setTransform(ctx.getTransform().inverse());

			for(let sq of world.squares) {
				const {x, y, image} = sq;
				if (image && Reflect.has(images, image)) {
					const img: HTMLImageElement = Reflect.get(images, image);
					if (img.complete) {
						ctx.drawImage(img, x * 32, y * 32);
					}
				}
			}

			ctx.beginPath();
			for (let y = cY - 1; y <= cY + 1; ++y) {
				if (y >= 0 && y < world.world.limitY) {
					for (let x = cX - 1; x <= cX + 1; ++x) {
						if (x >= 0 && x < world.world.limitX) {
							ctx.rect(x * 32, y * 32, 32, 32);
						}
					}
				}
			}
			ctx.fillStyle = "#AAA9";
			ctx.fill();

			ctx.beginPath();
			for (let y = 0; y < world.world.limitY; ++y) {
				for (let x = 0; x < world.world.limitX; ++x) {
					ctx.rect(x * 32, y * 32, 32, 32);
				}
			}

			ctx.strokeStyle = "black";
			ctx.lineWidth = 0.5;
			ctx.stroke();

			ctx.beginPath();
			ctx.ellipse(cX * 32 + 16, cY * 32 + 16, 12, 12, 0, 0, Math.PI * 2);
			ctx.fillStyle = theme.palette.secondary.main;
			ctx.fill();
			ctx.restore();
		}
	};

	const mouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode) {
			setDragging(true);
		}
	};

	const mouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode) {
			setDragging(false);
		}
	};

	const mouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
		if (e.button === 0 && navMode && canvas.current && dragging) {
			setOffsetX(offsetX + (e.movementX / zoom));
			setOffsetY(offsetY + (e.movementY / zoom));
			render(canvas.current);
		}
	};

	const click = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (e.button === 0 && !navMode && !dragging && canvas.current && character) {
			const rect = canvas.current.getBoundingClientRect();
			const mousePos = transform.transformPoint(new DOMPoint(e.clientX - rect.left, e.clientY - rect.top));
			const x = Math.floor(mousePos.x / 32);
			const y = Math.floor(mousePos.y / 32);

			if (x >= 0 && y >= 0 && x < character.square.world.limitX && y < character.square.world.limitY) {
				const {x: cX, y: cY} = character.square;
				if (x <= cX + 1 && x >= cX - 1 && y <= cY + 1 && y >= cY - 1) {
					onMove(x, y);
				}
			}
		}
	};

	const onResize = () => {
		if (canvas.current) {
			render(canvas.current);
		}
	};

	useEffect(() => {
		if (canvas.current) {
			Object.keys(images).forEach(name => {
				const img: HTMLImageElement = Reflect.get(images, name);
				img.src = `/assets/squares/${name}`;
				img.onload = () => {
					if (canvas.current) {
						render(canvas.current);
					}
				};
			});

			render(canvas.current);

			window.addEventListener("resize", onResize);
			return () => window.removeEventListener("resize", onResize);
		}

		return () => {
		};
	}, [canvas.current, world, character]);

	const marks: Mark[] = [
		{value: 0.5, label: "50%"},
		{value: 1.0, label: "100%"},
		{value: 1.5, label: "150%"},
	];

	if (!character || !world) {
		return <Fragment/>;
	}

	return <Card raised={raised}>
		<CardActionArea onMouseEnter={() => setRaised(true)} onMouseLeave={() => setRaised(false)} disableRipple>
			<CardHeader title="World" action={
				<FormGroup row>
					<FormControlLabel
						label="Zoom" labelPlacement="start"
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
			} style={{
				backgroundColor: world?.world.color,
			}}
			/>
			<CardContent classes={{root: classes.mapCard}}>
				<canvas
					ref={canvas} className={classes.canvas}
					style={{
						backgroundImage: `url('/assets/worlds/${world?.world.bgImage}')`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
					onMouseLeave={() => setDragging(false)} onClick={click}
					onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}
				/>
			</CardContent>
		</CardActionArea>
	</Card>;
};
