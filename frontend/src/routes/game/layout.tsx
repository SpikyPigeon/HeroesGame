import {createElement, forwardRef, Fragment, FunctionComponent, MouseEvent, useEffect, useState} from "react";
import {ChatSharp, CloseSharp, PersonSharp} from "@material-ui/icons";
import {useLinkProps, useNavigation} from "react-navi";
import {
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	createStyles,
	Fab,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	TextField,
	Theme,
	Toolbar,
	Typography,
	Zoom
} from "@material-ui/core";

import {store, useStoreActions, useStoreState} from "../../store";
import {PlayerCharacter} from "heroes-common";
import {useMount, useUnmount} from "react-use";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			[theme.breakpoints.up('sm')]: {
				zIndex: theme.zIndex.drawer + 1,
			},
		},
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		appBarLabel: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
		chat: {
			position: "fixed",
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
		chatContent: {
			maxHeight: "20rem",
			maxWidth: "18rem",
			height: "20rem",
			width: "18rem",
			overflowY: "auto",
			padding: 8,
			overflowWrap: "break-word",
		},
		chatParagraph: {
			marginBottom: 8,
		},
	}),
);

interface AppBarLinkProps {
	text: string;
	href: string;
}

const AppBarLink: FunctionComponent<AppBarLinkProps> = props => {
	const {text, href} = props;

	const classes = useStyles();
	const linkProps = useLinkProps({href});

	return <Button color="inherit" component="a" classes={{label: classes.appBarLabel}} {...linkProps}>
		{text}
	</Button>
};

interface AppMenuLinkProps {
	text: string;
	href: string;
	onClick: () => void;
}

const AppMenuLink = forwardRef<any, AppMenuLinkProps>((props, ref) => {
	const {text, href} = props;
	const {onClick, ...linkProps} = useLinkProps({href});

	return <MenuItem
		ref={ref}
		component="a"
		onClick={(e: MouseEvent<HTMLAnchorElement>) => {
			props.onClick();
			onClick(e);
		}}
		{...linkProps}
	>
		{text}
	</MenuItem>;
});

const GameChat: FunctionComponent = () => {
	const classes = useStyles();
	const [chatVisible, setChatVisible] = useState(false);
	const [prevChar, setPrevChar] = useState<PlayerCharacter | null>(null);
	const [content, setContent] = useState("");
	const currentChar = useStoreState(state => state.character.character);
	const messages = useStoreState(state => state.chat.messages);
	const sendMessage = useStoreActions(state => state.chat.send);
	const chatConnect = useStoreActions(state => state.chat.connect);
	const chatDisconnect = useStoreActions(state => state.chat.disconnect);

	useEffect(() => {
		if (currentChar) {
			if (!prevChar || prevChar.id !== currentChar.id) {
				setPrevChar(currentChar);
				chatConnect();
			}
		} else {
			chatDisconnect();
		}
	}, [currentChar]);

	useUnmount(() => {
		setPrevChar(null);
		chatDisconnect();
	});

	return <Fragment>
		<Zoom in={!chatVisible}>
			<Fab
				className={classes.chat} color="primary" centerRipple
				onClick={() => setChatVisible(true)}
			>
				<ChatSharp/>
			</Fab>
		</Zoom>
		<Zoom in={chatVisible}>
			<Card raised classes={{root: classes.chat}}>
				<CardHeader title="Chat" action={
					<IconButton onClick={() => setChatVisible(false)} color="secondary">
						<CloseSharp/>
					</IconButton>
				}/>
				<CardContent classes={{root: classes.chatContent}}>
					{messages.map((value, index) => (
						<Typography
							variant="body2" key={index} classes={{paragraph: classes.chatParagraph}}
						>
							<strong>{value.characterName}</strong> : {value.content}
						</Typography>
					))}
				</CardContent>
				<form onSubmit={e => {
					e.preventDefault();
					sendMessage(content);
					setContent("");
				}}>
					<CardActions>
						<TextField
							variant="filled" size="small" fullWidth name="chatText" label="Message"
							autoComplete="off"
							value={content} onChange={e => setContent(e.target.value)}
						/>
						<Button type="submit" color="primary">Send</Button>
					</CardActions>
				</form>
			</Card>
		</Zoom>
	</Fragment>;
};

const GameLayout: FunctionComponent = props => {
	const classes = useStyles();
	const [socialEl, setSocialEl] = useState<null | HTMLElement>(null);
	const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);
	const nav = useNavigation();

	const logout = useStoreActions(state => state.user.logout);
	const character = useStoreState(state => state.character.character);
	const loadUser = useStoreActions(state => state.user.getCurrent);
	const user = useStoreState(state => state.user.user);

	const handleSocialClose = () => setSocialEl(null);
	const handleProfileClose = () => setProfileEl(null);

	useMount(() => {
		if (!user) {
			loadUser().then(() => {
				if (!store.getState().user.user) {
					nav.navigate("/", {replace: true}).catch(console.error);
				}
			}).catch((e: any) => {
				console.error(e);
				nav.navigate("/", {replace: true}).catch(console.error);
			});
		}
	});

	if (!user) {
		return null;
	}

	return <Fragment>
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit" style={{paddingRight: 10}}>
					Heroes
				</Typography>

				<AppBarLink text="World" href="/game/"/>
				<AppBarLink text="Hero" href="/game/hero"/>
				<div style={{flexGrow: 1}}>
					<Button
						color="inherit"
						classes={{label: classes.appBarLabel}}
						onClick={e => setSocialEl(e.currentTarget)}
					>
						Social
					</Button>

					<Menu
						keepMounted
						anchorEl={socialEl}
						open={Boolean(socialEl)}
						onClose={handleSocialClose}
					>
						<AppMenuLink text="Message" href="/game/social/message" onClick={handleSocialClose}/>
						<AppMenuLink text="Guild" href="/game/social/guild" onClick={handleSocialClose}/>
						<AppMenuLink text="Party" href="/game/social/party" onClick={handleSocialClose}/>
					</Menu>
				</div>

				<Typography variant="subtitle2" noWrap style={{marginRight: "1rem"}}>
					Level : {character?.level ?? 0}
				</Typography>

				<Typography variant="subtitle2" noWrap style={{marginRight: "1rem"}}>
					Exp : {character?.experience ?? 0}
				</Typography>

				<Typography variant="subtitle2" noWrap style={{marginRight: "1rem"}}>
					Gold : {character?.gold ?? 0}
				</Typography>

				<Typography variant="subtitle2" noWrap style={{marginRight: "1rem"}}>
					Gem : {character?.gem ?? 0}
				</Typography>

				<IconButton color="inherit" onClick={e => setProfileEl(e.currentTarget)}>
					<PersonSharp/>
				</IconButton>

				<Menu
					keepMounted
					anchorEl={profileEl}
					open={Boolean(profileEl)}
					onClose={handleProfileClose}
				>
					<AppMenuLink text="Profile" href="/game/profile" onClick={handleProfileClose}/>
					<AppMenuLink text="Logout" href="/" onClick={() => {
						logout();
						handleProfileClose();
					}}/>
				</Menu>
			</Toolbar>
		</AppBar>
		<main className={classes.content}>
			<div className={classes.toolbar}/>
			{props.children || null}
			<GameChat/>
		</main>
	</Fragment>;
};

export default GameLayout;
