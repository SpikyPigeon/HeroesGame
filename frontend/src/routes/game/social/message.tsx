import {ChangeEvent, createElement, Fragment, FunctionComponent, useState} from "react";
import {CreateSharp, ExpandMoreSharp} from "@material-ui/icons";
import {useForm} from "react-hook-form";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	createStyles,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelDetails,
	ExpansionPanelProps,
	ExpansionPanelSummary,
	Grid,
	IconButton,
	makeStyles,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: "60%",
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
	}),
);

interface MessageData {
	id: string;
	title: string;
	content: string;
	sender: string;
	receiver: string;
	createdAt: Date;

	previous?: MessageData;
}

interface MessageDisplayProps {
	message: MessageData;
}

const MessageDisplay: FunctionComponent<MessageDisplayProps & ExpansionPanelProps> = props => {
	const classes = useStyles();
	const {message, ...expProps} = props;

	return <ExpansionPanel {...expProps}>
		<ExpansionPanelSummary expandIcon={<ExpandMoreSharp/>}>
			<Typography className={classes.heading}>
				{message.title}
				&nbsp;
				<Typography variant="caption">
					from {message.sender}
				</Typography>
			</Typography>
			<Typography className={classes.secondaryHeading}>{message.createdAt.toLocaleString()}</Typography>
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			<Typography>{message.content}</Typography>
		</ExpansionPanelDetails>
		{message.previous && <ExpansionPanelDetails style={{display: "block"}}>
			<MessageDisplay message={message.previous}/>
		</ExpansionPanelDetails>}
		<ExpansionPanelActions>
			<Button color="secondary">Delete</Button>
			<Button color="primary">Reply</Button>
		</ExpansionPanelActions>
	</ExpansionPanel>
};

interface MessageDisplayListProps {
	messages: Array<MessageData>;
}

const MessageDisplayList: FunctionComponent<MessageDisplayListProps> = props => {
	const {messages} = props;
	const [expanded, setExpanded] = useState<string | false>(false);

	const handleExpansion = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};

	return <Fragment>
		{messages.map((msg, id) => (
			<MessageDisplay message={msg} key={id}
			                TransitionProps={{unmountOnExit: true}}
			                expanded={expanded === msg.id}
			                onChange={handleExpansion(msg.id)}
			/>
		))}
	</Fragment>;
};

const Message: FunctionComponent = () => {
	const [sendOpen, setSendOpen] = useState(false);
	const {register, handleSubmit, errors, clearError, reset} = useForm<MessageData>();

	const handleClose = () => {
		clearError();
		reset();
		setSendOpen(false);
	};

	const onSubmit = async (data: MessageData) => {
		handleClose();
	};

	const messages: Array<MessageData> = [
		{
			id: "multi1",
			title: "RE : RE : Multi Message",
			content: "Blah Blah Blah",
			sender: "System",
			receiver: "",
			createdAt: new Date(),
			previous: {
				id: "multi2",
				title: "RE : Multi Message",
				content: "Blah Blah Blah",
				sender: "System",
				receiver: "",
				createdAt: new Date(),
				previous: {
					id: "multi3",
					title: "Multi Message",
					content: "Blah Blah Blah",
					sender: "System",
					receiver: "",
					createdAt: new Date(),
				},
			},
		},
	];

	[...Array(10).keys()].map(value => messages.push({
		id: value.toString(),
		title: `Message ${value + 1}`,
		content: "This is a Message!",
		sender: `User ${value + 1}`,
		receiver: "",
		createdAt: new Date(),
	}));

	return <Grid container justify="center">
		<Grid item lg={9}>
			<Card raised>
				<CardHeader title="Messages" action={
					<IconButton onClick={() => setSendOpen(true)}>
						<CreateSharp/>
					</IconButton>
				}/>
				<CardContent>
					<MessageDisplayList messages={messages}/>
				</CardContent>
			</Card>

			<Dialog open={sendOpen} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle>Send a new Message</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<TextField margin="dense" label="To" name="receiver" fullWidth autoFocus
						           error={Boolean(errors.receiver)}
						           helperText={errors.receiver ? "The user entered is invalid or doesn't exist" : null}
						           inputRef={register({
							           required: true,
							           validate: value => {
								           return false;
							           }
						           })}
						/>
						<TextField margin="dense" label="Title" name="title" fullWidth
						           error={Boolean(errors.title)} inputRef={register({required: true})}/>
						<TextField margin="dense" label="Content" name="content" fullWidth multiline rows={4}
						           rowsMax={10} error={Boolean(errors.content)}
						           inputRef={register({required: true})}/>
					</DialogContent>
					<DialogActions>
						<Button color="secondary" type="button" onClick={handleClose}>Cancel</Button>
						<Button color="primary" type="submit">Send</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Grid>
	</Grid>;
};

export default Message;
