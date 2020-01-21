import {createMuiTheme, createStyles, CssBaseline, makeStyles, Theme, ThemeProvider} from "@material-ui/core";
import {createElement, FunctionComponent, Suspense} from "react";
import {HelmetProvider} from "react-navi-helmet-async";
import {purple, teal} from "@material-ui/core/colors";
import {Router, View} from "react-navi";

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
	}),
);

const RootLayout: FunctionComponent = props => {
	const classes = useStyles();

	return <div className={classes.root}>
		<CssBaseline/>
		{props.children || null}
	</div>;
};

export const Site: FunctionComponent = props => {
	return <HelmetProvider>
		<Router routes={Routes}>
			<ThemeProvider theme={theme}>
				<RootLayout>
					<Suspense fallback={null}>
						<View/>
					</Suspense>
				</RootLayout>
			</ThemeProvider>
		</Router>
	</HelmetProvider>;
};
