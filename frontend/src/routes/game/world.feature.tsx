import {createElement, Fragment, FunctionComponent, useState} from "react";
import {Card, CardContent, CardHeader} from "@material-ui/core";

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
				<Card key={index} style={{minHeight: 70, marginBottom: 8, textAlign: "center"}}>
					<CardContent style={{padding: 3}}>
						<CardHeader title={value.name}
						            titleTypographyProps={{
							            align: "left",
							            variant: "h5",
						            }}
						/>
					</CardContent>
				</Card>
			))}
		</Fragment>;
	}
};
/*{value.shop && <Grid item lg={1}>
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
		</CardActionArea>
	</Card>
</Grid>}*/
