import {createElement, Fragment, FunctionComponent, useState} from "react";
import {Card, CardActionArea, CardContent, CardHeader, Grid, Typography} from "@material-ui/core";

import {Structure} from "heroes-common";

interface FeatureCardProps {
	structures: Array<Structure>;
}

export const FeatureCard: FunctionComponent<FeatureCardProps> = ({structures}) => {
	const [raised, setRaised] = useState(false);

	if (structures.length < 1) {
		return null;
	} else {
		return <Fragment>
			{structures.map((value, index) => (
				<Card key={index} style={{minHeight: 100, marginBottom: 8}}>
					<CardContent style={{padding: 3}}>
						<Grid container>
							<Grid item lg={3}>
								<CardHeader title={value.name}
								            titleTypographyProps={{
									            align: "left",
									            variant: "h5",
								            }}
								/>
							</Grid>
							<Grid item lg={5}>
								<Typography align="left">
									{value.description}
								</Typography>
							</Grid>
							{value.shop && <Grid item lg={4}>
								<Card raised={raised} square>
									<CardActionArea
										onMouseEnter={() => setRaised(true)}
										onMouseLeave={() => setRaised(false)}
									>
										<CardHeader title={"Shop Name"}
										            titleTypographyProps={{
											            align: "center",
											            variant: "h6",
										            }}
										/>
										<Typography align="center">
											{"Shop description"}
										</Typography>
										<Typography align="center" variant="body2">
											{"Click to shop!"}
										</Typography>
									</CardActionArea>
								</Card>
							</Grid>}
						</Grid>
					</CardContent>
				</Card>
			))}
		</Fragment>;
	}
};
