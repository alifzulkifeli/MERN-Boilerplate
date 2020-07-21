import React from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Facebook = ({ informParent = (f) => f }) => {
	const responseFacebook = (res) => {
		console.log(res);
		axios({
			method: "post",
			url: `${process.env.REACT_APP_API}/facebook-login`,
			data: { userID: res.userID, accessToken: res.accessToken },
		})
			.then((res) => {
				console.log("Facebook Signin", res);
				informParent(res);
			})
			.catch((err) => {
				console.log("Facebook error", err);
			});
	};

	return (
		<div className="mt-4">
			<FacebookLogin
				appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
				autoLoad={false}
				callback={responseFacebook}
				fields="name,email,picture"
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
					>
						Login with Facebook
					</button>
				)}
			/>
		</div>
	);
};

export default Facebook;
