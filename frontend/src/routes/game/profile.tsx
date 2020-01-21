import {createElement, FunctionComponent} from "react";
import {Grid} from "@material-ui/core";

import CharacterCard from "./profile.char";
import UserCard from "./profile.user";

const Profile: FunctionComponent = () => {
	return <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
		<Grid item md={6} xs={11}>
			<UserCard/>
		</Grid>
		<Grid item md={6} xs={11}>
			<CharacterCard/>
		</Grid>
	</Grid>;
};

export default Profile;
