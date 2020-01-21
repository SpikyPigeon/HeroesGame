import {mount, redirect, route} from "navi";
import {createElement} from "react";

export default mount({
	"/message": route({
		title: "Messages - ProtoHeroes",
		getView: () => import("./message"),
	}),
	"/guild": route({
		title: "Guild - ProtoHeroes",
		getView: () => import("./guild"),
	}),
	"/party": route({
		title: "Party - ProtoHeroes",
		getView: () => import("./party"),
	}),
	"/": redirect("/game/social/message"),
});
