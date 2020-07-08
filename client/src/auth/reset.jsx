import React, { useState, useEffect } from "react";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Reset = ({ match, history }) => {
	const [values, setValues] = useState({
		token: "",
		password: "",
		password2: "",
		buttonText: "Reset Password",
	});

	useEffect(() => {
		let token = match.params.token;

		if (token) {
			setValues({ ...values, name, token });
		}
	}, []);

	const { name, token, password, password2, buttonText } = values;

	const handleChange = (input) => (event) => {
		setValues({ ...values, [input]: event.target.value });
		console.log(values);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/reset-password`,
			data: { newPassword: password, resetPasswordLink: token },
		})
			.then((response) => {
				console.log(response);
				toast.success(response.data.message);
				history.push("/signin");
			})
			.catch((error) => {
				console.log(error.response);
				toast.error(error.response.data.error);
			});
	};

	const resetForm = () => (
		<div className="bg-grey-lighter items-center  h-screen flex flex-col">
			<div className="container max-w-lg   w-2/3 flex-1 flex  items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Enter new password</h1>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
						name="password"
						placeholder="Password"
						onChange={handleChange("password")}
						value={password}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
						name="password2"
						placeholder="Retype Password"
						onChange={handleChange("password2")}
						value={password2}
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none my-1"
						onClick={handleSubmit}
					>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
	return (
		<Layout>
			<ToastContainer />

			{resetForm()}
		</Layout>
	);
};

export default Reset;
