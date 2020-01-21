import {createElement, Fragment, FunctionComponent, useState} from "react";
import {green} from "@material-ui/core/colors";
import {useNavigation} from "react-navi";
import {useForm} from "react-hook-form";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	GridList,
	GridListTile,
	TextField,
	Typography
} from "@material-ui/core";

interface CharacterInfo {
	name: string;
	avatar: number;
}

interface MyDialogProps {
	open: boolean;
	onClose: () => void;
}

const DeleteCharDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;
	const nav = useNavigation();

	const handleClick = async () => {
		await nav.navigate("/hero");
	};

	return <Dialog open={open} onClose={onClose}>
		<DialogTitle>Are you sure?</DialogTitle>
		<DialogContent>
			<DialogContentText>
				There is no turning back once your Character is deleted.
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

const RenameCharDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;

	const {register, handleSubmit, errors, clearError, reset} = useForm<CharacterInfo>({
		defaultValues: {
			name: "Gardakhan",
		},
	});

	const handleClose = () => {
		clearError();
		reset();
		onClose();
	};

	const onSubmit = async (data: CharacterInfo) => {
		handleClose();
	};

	return <Dialog open={open} onClose={handleClose}>
		<DialogTitle>Rename your Character</DialogTitle>
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogContent>
				<TextField margin="dense" label="Name" name="name" fullWidth error={Boolean(errors.name)}
				           inputRef={
					           register({
						           required: true,
						           minLength: 4,
						           maxLength: 30,
					           })
				           }/>
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

const AvatarDialog: FunctionComponent<MyDialogProps> = props => {
	const {open, onClose} = props;
	const [avatar, setAvatar] = useState<number | boolean>(false);

	return <Dialog open={open} onClose={onClose} scroll="body" maxWidth="md" fullWidth>
		<DialogTitle>Change Character's Avatar</DialogTitle>
		<DialogContent>
			<GridList cellHeight={128} cols={6}>
				{[...Array(20).keys()].map(value => (
					<GridListTile key={value}>
						<Card variant="outlined"
						      style={{
							      height: "100%",
							      backgroundColor: avatar === value ? green[300] : "white",
						      }}
						>
							<CardActionArea
								style={{height: "100%"}}
								onClick={() => setAvatar(value)}
							>
								<CardContent>
									<Typography>Avatar {value + 1}</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</GridListTile>
				))}
			</GridList>
		</DialogContent>
		<DialogActions>
			<Button type="button" color="primary" onClick={onClose}>
				Apply
			</Button>
			<Button type="button" color="secondary" onClick={onClose}>
				Cancel
			</Button>
		</DialogActions>
	</Dialog>;
};

const CharacterCard: FunctionComponent = () => {
	const [delOpen, setDelOpen] = useState(false);
	const [renameOpen, setRenameOpen] = useState(false);
	const [avatarOpen, setAvatarOpen] = useState(false);

	return <Fragment>
		<Card>
			<CardHeader title="Gardakhan"/>
			<CardMedia component="img" src="https://cdn.pixabay.com/photo/2017/10/06/17/00/knight-2823787__180.png"/>
			<CardActions>
				<Button size="small" color="secondary" onClick={() => setDelOpen(true)}>
					Delete
				</Button>
				<Button size="small" color="primary" onClick={() => setRenameOpen(true)}>
					Rename
				</Button>
				<Button size="small" color="primary" onClick={() => setAvatarOpen(true)}>
					Change Avatar
				</Button>
			</CardActions>
		</Card>

		<DeleteCharDialog open={delOpen} onClose={() => setDelOpen(false)}/>
		<RenameCharDialog open={renameOpen} onClose={() => setRenameOpen(false)}/>
		<AvatarDialog open={avatarOpen} onClose={() => setAvatarOpen(false)}/>
	</Fragment>;
};

export default CharacterCard;
