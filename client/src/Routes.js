import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/signup";
import Signin from "./auth/signin";
import Activate from "./auth/Activate";
import Private from "./core/Profile";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import AdminPage from "./core/Admin";
import ProfileEdit from "./core/ProfileEdit";
import Forgot from "./auth/forgot";
import Reset from "./auth/reset";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/auth/activate/:token" exact component={Activate} />
				<PrivateRoute path="/profile" exact component={Private} />
				<PrivateRoute path="/profile/edit" exact component={ProfileEdit} />
				<AdminRoute path="/admin" exact component={AdminPage} />
				<Route path="/password/forgot" exact component={Forgot} />
				<Route path="/password/reset/:token" exact component={Reset} />
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
