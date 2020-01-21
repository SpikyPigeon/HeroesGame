import {createElement, FunctionComponent, useState} from "react";
import {useNavigation} from "react-navi";
import {useForm} from "react-hook-form";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	makeStyles,
	styled,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";

interface LoginCredential {
	email: string;
	password: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			backgroundColor: "rgba(255, 255, 255, 0.6)",
		},
	}),
);

const Content = styled("div")(({theme}) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	backgroundImage: "url('/assets/login-backdrop.jpg')",
	backgroundRepeat: "no-repeat",
	backgroundSize: "cover",
	backgroundPosition: "bottom",
	minHeight: "100vh",
}));

const Home: FunctionComponent = () => {
	const {register, handleSubmit, errors} = useForm<LoginCredential>();
	const nav = useNavigation();
	const classes = useStyles();

	const onSubmit = async (data: LoginCredential) => {
		try {
			await nav.navigate("/game");
		} catch (e) {
			alert("ERROR");
		}
	};

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return <Content>
		<Grid container spacing={5} justify="space-evenly" alignItems="center" style={{height: "100%"}}>
			<Grid item lg={5}>
				<Card raised className={classes.card}>
					<CardHeader title="What is this game?"/>
					<CardContent>
						<Typography paragraph>Description</Typography>
					</CardContent>
				</Card>
			</Grid>
			<Grid item lg={3}>
				<Card raised className={classes.card}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardHeader title="Connect to the game"/>
						<CardContent>
							<TextField autoFocus margin="dense" label="Email Adress" name="email" fullWidth
							           inputRef={register({
								           required: true,
								           pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
							           })} error={Boolean(errors.email)}/>
							<TextField margin="dense" label="Password" type="password" name="password" fullWidth
							           inputRef={register({
								           required: true,
								           minLength: 7,
							           })} error={Boolean(errors.password)}/>
						</CardContent>
						<CardActions>
							<Button type="button" color="secondary" onClick={handleClickOpen}>
								Register
							</Button>
							<Button type="submit" color="primary">Login</Button>
						</CardActions>
					</form>
				</Card>
			</Grid>
		</Grid>
		<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
			<form>
				<DialogTitle id="form-dialog-title">Create account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To start playing, please fill this form and click Register.
					</DialogContentText>
					<TextField
						margin="dense" label="First Name" type="text"
						fullWidth autoFocus
					/>
					<TextField
						margin="dense" label="Last Name" type="text"
						fullWidth
					/>
					<TextField
						margin="dense" label="Email Adress" type="email"
						fullWidth
					/>
					<TextField
						margin="dense" label="Password" type="password"
						fullWidth
					/>
					<TextField
						margin="dense" label="Confirm Password" type="password"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" type="reset">
						Cancel
					</Button>
					<Button color="primary" type="submit" onClick={async () => {
						handleClose();
						await nav.navigate("/hero");
					}}>
						Register
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	</Content>;
};

export default Home;
