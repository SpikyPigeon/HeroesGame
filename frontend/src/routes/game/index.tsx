import {compose, mount, route, withView} from "navi";
import {createElement} from "react";
import {View} from "react-navi";

import Layout from "./layout";
import Social from "./social";

export default compose(
	withView(() => <Layout><View/></Layout>),
	mount({
		"/": route({
			title: "World - ProtoHeroes",
			getView: () => import("./world"),
		}),
		"/hero": route({
			title: "Hero - ProtoHeroes",
			getView: () => import("./hero"),
		}),
		"/profile": route({
			title: "Profile - ProtoHeroes",
			getView: () => import("./profile"),
		}),
		"/social": Social,
	}),
);
