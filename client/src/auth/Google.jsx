import React from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { authenticate, isAuth } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Google = ({ informParent = (f) => f }) => {
	const responseGoogle = (res) => {
		console.log(res.tokenId);
		axios({
			method: "post",
			url: `${process.env.REACT_APP_API}/google-login`,
			data: { idToken: res.tokenId },
		})
			.then((res) => {
				console.log("Google Signin", res);
				informParent(res);
			})
			.catch((err) => {
				console.log("Google error", err);
			});
	};

	return (
		<div>
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
				render={(renderProps) => (
					<button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
					>
						Login with Google
					</button>
				)}
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={"single_host_origin"}
			/>
		</div>
	);
};

export default Google;
