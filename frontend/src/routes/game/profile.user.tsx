import {createElement, Fragment, FunctionComponent, useEffect, useState} from "react";
import {useNavigation} from "react-navi";
import {useForm} from "react-hook-form";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	makeStyles,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";

import {ModifyUserProfile, PasswordChange} from "heroes-common";
import {useStoreActions, useStoreState} from "../../store";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		chips: {
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(0.5),
			},
		},
	}),
);

interface MyDialogProps {
	open: boolean;
	onClose: () => void;
}

const DisableAccountDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;
	const modifyProfile = useStoreActions(state => state.user.modifyProfile);
	const logout = useStoreActions(state => state.user.logout);
	const nav = useNavigation();

	const handleClick = async () => {
		await modifyProfile({isActive: false});
		logout();
		await nav.navigate("/");
	};

	return <Dialog open={open} onClose={onClose}>
		<DialogTitle>Are you sure?</DialogTitle>
		<DialogContent>
			<DialogContentText>
				There is no turning back once your Account is disabled.
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button type="button" color="primary" onClick={handleClick}>
				Yes
			</Button>
			<Button type="button" color="secondary" onClick={onClose}>
				No
			</Button>
		</DialogActions>
	</Dialog>;
};

const PasswordDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;

	type PasswordData = PasswordChange & { validate: string };
	const {register, handleSubmit, errors, clearError, reset, getValues} = useForm<PasswordData>();
	const changePassword = useStoreActions(state => state.user.changePassword);

	const handleClose = () => {
		clearError();
		reset();
		onClose();
	};

	const onSubmit = async (data: PasswordData) => {
		await changePassword({...data});
		reset();
		handleClose();
	};

	return <Dialog open={open} onClose={handleClose}>
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogContent>
				<TextField type="password" fullWidth margin="dense" label="Old Password" name="oldPass"
				           error={Boolean(errors.oldPass)} inputRef={register({required: true, minLength: 7})}/>
				<TextField type="password" fullWidth margin="dense" label="New Password" name="newPass"
				           error={Boolean(errors.newPass)} inputRef={register({required: true, minLength: 7})}/>
				<TextField type="password" fullWidth margin="dense" label="Repeat New Password" name="validate"
				           error={Boolean(errors.validate)}
				           inputRef={register({
					           required: true,
					           minLength: 7,
					           validate: value => {
						           const {newPass} = getValues();
						           return value === newPass;
					           }
				           })}/>
			</DialogContent>
			<DialogActions>
				<Button type="submit" color="primary">
					Apply
				</Button>
				<Button type="button" color="secondary" onClick={handleClose}>
					Cancel
				</Button>
			</DialogActions>
		</form>
	</Dialog>;
};

const ProfileDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;
	const user = useStoreState(state => state.user.user);
	const modifyProfile = useStoreActions(state => state.user.modifyProfile);

	const {register, handleSubmit, errors, clearError, reset, setValue} = useForm<ModifyUserProfile>();

	useEffect(() => {
		setTimeout(() => {
			if (user) {
				setValue("email", user.email);
				setValue("firstName", user.firstName);
				setValue("lastName", user.lastName);
			}
		});
	}, [setValue, open]);

	const handleClose = () => {
		clearError();
		reset();
		onClose();
	};

	const onSubmit = async (data: ModifyUserProfile) => {
		await modifyProfile(data);
		handleClose();
	};

	if (!user) {
		return <Fragment/>;
	}

	return <Dialog open={open} onClose={handleClose}>
		<DialogTitle>Modify Profile</DialogTitle>
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogContent>
				<TextField margin="dense" label="Email Adress" name="email" fullWidth inputRef={register({
					required: true,
					pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				})} error={Boolean(errors.email)} InputLabelProps={{shrink: true}}/>

				<TextField margin="dense" label="First Name" name="firstName" fullWidth InputLabelProps={{shrink: true}}
				           error={Boolean(errors.firstName)} inputRef={register({required: true})}/>

				<TextField margin="dense" label="Last Name" name="lastName" fullWidth InputLabelProps={{shrink: true}}
				           error={Boolean(errors.lastName)} inputRef={register({required: true})}/>
			</DialogContent>
			<DialogActions>
				<Button type="submit" color="primary">
					Apply
				</Button>
				<Button type="button" color="secondary" onClick={handleClose}>
					Cancel
				</Button>
			</DialogActions>
		</form>
	</Dialog>;
};

const UserCard: FunctionComponent = () => {
	const classes = useStyles();
	const [disAccOpen, setDisAccOpen] = useState(false);
	const [passOpen, setPassOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);

	const user = useStoreState(state => state.user.user);

	if (!user) {
		return <Fragment/>;
	}

	return <Fragment>
		<Card>
			<CardContent>
				<Typography variant="h6" color="textSecondary" align="center">
					{user.firstName} {user.lastName}
				</Typography>
				{user.isAdmin && <div className={classes.chips}>
					<Chip variant="outlined" size="small" label="Admin" color="secondary"/>
				</div>}
			</CardContent>
			<CardActions>
				<Button size="small" color="secondary" onClick={() => setDisAccOpen(true)}>
					Disable Account
				</Button>
				<Button size="small" color="primary" onClick={() => setPassOpen(true)}>
					Change Password
				</Button>
				<Button size="small" color="primary" onClick={() => setProfileOpen(true)}>
					Modify Profile
				</Button>
			</CardActions>
		</Card>

		<DisableAccountDialog open={disAccOpen} onClose={() => setDisAccOpen(false)}/>
		<PasswordDialog open={passOpen} onClose={() => setPassOpen(false)}/>
		<ProfileDialog open={profileOpen} onClose={() => setProfileOpen(false)}/>
	</Fragment>
};

export default UserCard;
