import {createElement, Fragment, FunctionComponent, useEffect, useState} from "react";
import {green} from "@material-ui/core/colors";
import {useNavigation} from "react-navi";
import {useForm} from "react-hook-form";
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardHeader,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	GridList,
	GridListTile,
	TextField
} from "@material-ui/core";
import {useStoreActions, useStoreState} from "../../store";
import {Avatar} from "heroes-common/src";

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

	const {register, handleSubmit, errors, clearError, reset, setValue} = useForm<CharacterInfo>();
	const currentHero = useStoreState(state => state.character.character);
	const updateChar = useStoreActions(state => state.character.update);

	useEffect(() => {
		setTimeout(() => {
			if (currentHero) {
				setValue("name", currentHero.name);
			}
		});
	}, [setValue, open, currentHero]);

	if (!currentHero) {
		return <Fragment/>;
	}

	const handleClose = () => {
		clearError();
		reset();
		onClose();
	};

	const onSubmit = async (data: CharacterInfo) => {
		await updateChar({name: data.name});
		handleClose();
	};

	return <Dialog open={open} onClose={handleClose}>
		<DialogTitle>Rename your Character</DialogTitle>
		<form onSubmit={handleSubmit(onSubmit)}>
			<DialogContent>
				<TextField margin="dense" label="Name" name="name" fullWidth error={Boolean(errors.name)}
				           InputLabelProps={{shrink: true}} inputRef={
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
	const [avatarList, setAvatarList] = useState<Array<Avatar>>([]);

	const listAvatars = useStoreActions(state => state.character.listAvatars);
	const currentHero = useStoreState(state => state.character.character);
	const updateChar = useStoreActions(state => state.character.update);

	useEffect(() => {
		listAvatars().then(value => setAvatarList(value)).catch(console.error);
	}, []);

	if (!currentHero) {
		return <Fragment/>;
	}

	return <Dialog open={open} onClose={onClose} scroll="body" maxWidth="md" fullWidth>
		<DialogTitle>Change {currentHero.name}'s Avatar</DialogTitle>
		<DialogContent>
			<GridList cellHeight={128} cols={6} style={{maxHeight: "75vh", overflow: "auto"}}>
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
		</DialogContent>
		<DialogActions>
			<Button type="button" color="primary" onClick={
				async () => {
					if (typeof avatar === "number") {
						await updateChar({avatarId: avatar});
						onClose();
					}
				}
			}>
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

	const currentHero = useStoreState(state => state.character.character);

	if (!currentHero) {
		return <Fragment/>;
	}

	return <Fragment>
		<Card>
			<CardHeader title={currentHero.name}/>
			<CardMedia component="img" src={`/assets/avatar/${currentHero.avatar.filename}`}/>
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
