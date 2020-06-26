import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt from "jsonwebtoken";

const Activate = ({ match }) => {
	const [values, setValues] = useState({
		name: "",
		token: "",
		show: true,
	});

	useEffect(() => {
		let token = match.params.token;
		let { name } = jwt.decode(token);
		if (token) {
			setValues({ ...values, name, token });
		}
	}, []);

	const { name, token, show } = values;

	const clickSubmit = (event) => {
		event.preventDefault();

		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/account-activation`,
			data: { token },
		})
			.then((response) => {
				console.log("Account activation", response);
				setValues({ ...values, show: false });
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log("account activation error ", error.response.data.error);
				toast.error(error.response.data.error);
			});
	};

	const activationLink = () => (
		<div className="bg-grey-lighter h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<h1 className=" text-xl mb-5  text-center  text-gray-700">
					Hello {name}, please click the button to verify your account
				</h1>
				<button
					className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded "
					onClick={clickSubmit}
				>
					Verify Account
				</button>
			</div>
		</div>
	);

	return (
		<Layout>
			<ToastContainer />
			<div>{activationLink()}</div>
		</Layout>
	);
};

export default Activate;
