import {createElement, forwardRef, Fragment, FunctionComponent, MouseEvent, useState} from "react";
import {ChatSharp, CloseSharp, PersonSharp} from "@material-ui/icons";
import {useLinkProps} from "react-navi";
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
			overflow: "auto",
			padding: 8,
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

interface ChatMessage {
	sender: string;
	content: string;
}

const GameChat: FunctionComponent = () => {
	const classes = useStyles();
	const [chatVisible, setChatVisible] = useState(false);

	const messages: ChatMessage[] = [
		{sender: "Stormist", content: "I'm level 98! What about you?"},
		{sender: "SpikyPigeon", content: "I'm struggling with that freaking boss..."},
		{sender: "Stormist", content: "Yeah... He's a bitch"},
		{sender: "System", content: "Hello World!"},
	];

	return <Fragment><Zoom in={!chatVisible}>
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
					{messages.map((value, index) => <Typography
						variant="body2" paragraph key={index} classes={{paragraph: classes.chatParagraph}}
					>
						<strong>{value.sender}</strong> : {value.content}
					</Typography>)}
				</CardContent>
				<CardActions>
					<TextField variant="filled" size="small" fullWidth name="chatText" label="Message"/>
					<Button color="primary">Send</Button>
				</CardActions>
			</Card>
		</Zoom>
	</Fragment>;
};

const GameLayout: FunctionComponent = props => {
	const classes = useStyles();
	const [socialEl, setSocialEl] = useState<null | HTMLElement>(null);
	const [profileEl, setProfileEl] = useState<null | HTMLElement>(null);

	const handleSocialClose = () => setSocialEl(null);
	const handleProfileClose = () => setProfileEl(null);

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
					<AppMenuLink text="Logout" href="/" onClick={handleProfileClose}/>
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
