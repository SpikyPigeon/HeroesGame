import {createElement, FunctionComponent, useEffect} from "react";
import {Grid} from "@material-ui/core";

import CharacterCard from "./profile.char";
import UserCard from "./profile.user";
import {useStoreActions} from "../../store";
import {useNavigation} from "react-navi";

const Profile: FunctionComponent = () => {
	const loadHero = useStoreActions(state => state.character.getMine);
	const nav = useNavigation();

	useEffect(() => {
		loadHero().catch((e: any) => {
			console.error(e);
			nav.navigate("/");
		});
	}, []);

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
