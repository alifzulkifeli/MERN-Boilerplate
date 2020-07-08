import React, { useState } from "react";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Forgot = ({ history }) => {
	const [values, setValues] = useState({
		email: "",
		buttonText: "Send link",
	});

	const { email, buttonText } = values;

	const handleChange = (input) => (event) => {
		setValues({ ...values, [input]: event.target.value });
		console.log(values);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/forgot-password`,
			data: { email },
		})
			.then((response) => {
				console.log(response);
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log(error.response);
				toast.error(error.response.data.error);
			});
	};

	const forgotForm = () => (
		<div className="bg-grey-lighter items-center  h-screen flex flex-col">
			<div className="container max-w-lg   w-2/3 flex-1 flex  items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Reset password</h1>

					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4 outline-none"
						name="email"
						placeholder="Email"
						onChange={handleChange("email")}
						value={email}
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

			{forgotForm()}
		</Layout>
	);
};

export default Forgot;
