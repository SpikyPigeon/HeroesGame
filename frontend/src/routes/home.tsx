import {createElement, Fragment, FunctionComponent, useState} from "react";
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
import {useStoreActions, useStoreState} from "../store";
import {CreateUserInfo} from "heroes-common";

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

interface RegisterDialogProps {
	open: boolean;
	onClose: () => void;
}

const RegisterDialog: FunctionComponent<RegisterDialogProps> = props => {
	type RegisterData = CreateUserInfo & { validate: string };
	const {register, handleSubmit, errors, clearError, reset, getValues} = useForm<RegisterData>();
	const {open, onClose} = props;
	const nav = useNavigation();

	const registerUser = useStoreActions(state => state.user.register);

	const handleClose = () => {
		clearError();
		reset();
		onClose();
	};

	const onSubmit = async (data: RegisterData) => {
		try {
			await registerUser({...data});
			handleClose();
			await nav.navigate("/hero");
		} catch (e) {
			console.error(e);
		}
	};

	return <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogTitle id="form-dialog-title">Create account</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To start playing, please fill this form and click Register.
				</DialogContentText>
				<TextField
					margin="dense" label="First Name" name="firstName"
					fullWidth autoFocus error={Boolean(errors.firstName)} inputRef={register({
					required: true,
					maxLength: 30,
				})}/>
				<TextField
					margin="dense" label="Last Name" name="lastName"
					fullWidth error={Boolean(errors.lastName)} inputRef={register({
					required: true,
					maxLength: 30,
				})}/>
				<TextField
					margin="dense" label="Email Adress" name="email"
					fullWidth error={Boolean(errors.email)} inputRef={register({
					required: true,
					pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
					maxLength: 60,
				})}/>
				<TextField
					margin="dense" label="Password" type="password" name="password"
					fullWidth error={Boolean(errors.password)} inputRef={register({
					required: true,
					minLength: 7,
				})}/>
				<TextField
					margin="dense" label="Confirm Password" type="password" name="validate"
					fullWidth error={Boolean(errors.validate)} inputRef={register({
					required: true,
					minLength: 7,
					validate: value => {
						const {password} = getValues();
						return value === password;
					},
				})}/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" type="reset">
					Cancel
				</Button>
				<Button color="primary" type="submit">
					Register
				</Button>
			</DialogActions>
		</form>
	</Dialog>;
};

const Home: FunctionComponent = () => {
	const addSnack = useStoreActions(state => state.notification.enqueue);
	const {register, handleSubmit, errors} = useForm<LoginCredential>();
	const [registerOpen, setRegisterOpen] = useState(false);
	const nav = useNavigation();
	const classes = useStyles();

	const user = {
		logout: useStoreActions(state => state.user.logout),
		login: useStoreActions(state => state.user.login),
		info: useStoreState(state => state.user.user),
	};

	const onSubmit = async (data: LoginCredential) => {
		try {
			await user.login(data);
			await nav.navigate("/hero");
		} catch (e) {
			addSnack({
				message: "Failed to login!",
				options: {
					variant: "error",
				},
			});

			console.error(e);
		}
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
						{user.info && <Fragment>
							<CardContent>
								<Typography variant="body1" paragraph>
									Logged in as {user.info.firstName} {user.info.lastName}
								</Typography>
							</CardContent>
							<CardActions>
								<Button color="secondary" onClick={() => user.logout()}>
									Logout
								</Button>
								<Button color="primary" onClick={async () => await nav.navigate("/hero")}>
									Continue
								</Button>
							</CardActions>
						</Fragment>}
						{user.info === null && <Fragment>
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
								<Button type="button" color="secondary" onClick={() => setRegisterOpen(true)}>
									Register
								</Button>
								<Button type="submit" color="primary">Login</Button>
							</CardActions>
						</Fragment>}
					</form>
				</Card>
			</Grid>
		</Grid>
		<RegisterDialog open={registerOpen} onClose={() => setRegisterOpen(false)}/>
	</Content>;
};

export default Home;
