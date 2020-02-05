import {createElement, FunctionComponent, MouseEvent, useEffect, useRef, useState} from "react";
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
	Theme
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
		canvas: {
			width: "100%",
			height: 400,
		},
	}),
);

export const WorldMapCard: FunctionComponent = () => {
	let canvas = useRef<HTMLCanvasElement>(null);
	const classes = useStyles();
	const [zoom, setZoom] = useState(1.0);
	const [offsetX, setOffsetX] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [dragging, setDragging] = useState(false);
	const [navMode, setNavMode] = useState(false);
	const [raised, setRaised] = useState(false);
	const [transform, setTransform] = useState<DOMMatrix>(new DOMMatrix());

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
			setTransform(ctx.getTransform().inverse());

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
			setOffsetX(offsetX + (e.movementX / zoom));
			setOffsetY(offsetY + (e.movementY / zoom));
			render(canvas.current);
		}
	};

	const click = (e: MouseEvent<HTMLCanvasElement>) => {
		e.preventDefault();
		if (e.button === 0 && !navMode && !dragging && canvas.current) {
			const rect = canvas.current.getBoundingClientRect();
			const mousePos = transform.transformPoint(new DOMPoint(e.clientX - rect.left, e.clientY - rect.top));

			if (mousePos.x >= 0 && mousePos.y >= 0) {
				const x = Math.floor(mousePos.x / 32);
				const y = Math.floor(mousePos.y / 32);
				console.log(`SQUARE @ ${x}:${y}`);
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
