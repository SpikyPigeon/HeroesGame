import {createElement, FunctionComponent} from "react";
import {Card} from "@material-ui/core";

import {Encounter} from "heroes-common";
import {useStoreActions, useStoreState} from "../../store";

interface WorldActionProps {
	encounters: Array<Encounter>;
}

export const WorldAction: FunctionComponent<WorldActionProps> = ({encounters}) => {
	const character = useStoreState(state => state.character.character);
	const updateChar = useStoreActions(state => state.character.update);

	if (!character) {
		return null;
	}

	return <Card>

	</Card>;
};
