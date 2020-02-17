import {createMuiTheme, createStyles, CssBaseline, makeStyles, Theme, ThemeProvider} from "@material-ui/core";
import {createElement, FunctionComponent, Suspense, useEffect} from "react";
import {SnackbarProvider, useSnackbar} from "notistack";
import {HelmetProvider} from "react-navi-helmet-async";
import {purple, teal} from "@material-ui/core/colors";
import {hot} from "react-hot-loader/root";
import {StoreProvider} from "easy-peasy";
import {Router, View} from "react-navi";
import {useList} from "react-use";

import {store, useStoreActions, useStoreState} from "./store";
import Routes from "./routes";

const theme: Theme = createMuiTheme({
	palette: {
		type: "light",
		primary: teal,
		secondary: purple
	}
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		snackContainer: {
			marginTop: theme.spacing(7),
		},
	}),
);

const Notifier: FunctionComponent = () => {
	const notifications = useStoreState(state => state.notification.notifications);
	const removeSnack = useStoreActions(state => state.notification.remove);
	const {closeSnackbar, enqueueSnackbar} = useSnackbar();

	const [displayed, {push: pushDisplayed, removeAt: removeDisplayed}] = useList<number>([]);

	useEffect(() => {
		notifications.forEach(({key, message, dismissed, ...rest}) => {
			if (dismissed) {
				return;
			}

			if (displayed.includes(key)) return;

			enqueueSnackbar(message, {
				key,
				variant: rest.variant,
				action: rest.action,
				onClose: rest.onClose,
				onExited: e => {
					removeSnack(key);
					removeDisplayed(key);
				},
			});

			pushDisplayed(key);
		});
	}, [notifications, closeSnackbar, enqueueSnackbar, removeSnack]);

	return null;
};

const RootLayout: FunctionComponent = props => {
	const classes = useStyles();

	return <div className={classes.root}>
		<CssBaseline/>
		<Notifier/>
		{props.children || null}
	</div>;
};

const Site: FunctionComponent = () => {
	const classes = useStyles();

	return <HelmetProvider>
		<Router routes={Routes}>
			<StoreProvider store={store}>
				<ThemeProvider theme={theme}>
					<SnackbarProvider
						classes={{containerAnchorOriginTopRight: classes.snackContainer}}
						dense={true}
						maxSnack={9}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<RootLayout>
							<Suspense fallback={null}>
								<View/>
							</Suspense>
						</RootLayout>
					</SnackbarProvider>
				</ThemeProvider>
			</StoreProvider>
		</Router>
	</HelmetProvider>;
};

export default hot(Site);
