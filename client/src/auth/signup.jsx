import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
	const [values, setValues] = useState({
		name: "aliff",
		email: "alifzulkifeli@gmail.com",
		password: "aiman987",
		confirmPassword: "aiman987",
		buttonText: "Create account",
	});

	const { name, email, password, confirmPassword, buttonText } = values;
	const handleChange = (input) => (event) => {
		setValues({ ...values, [input]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, buttonText: "Creating account" });
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/signup`,
			data: { name, email, password },
		})
			.then((response) => {
				console.log(response);
				setValues({ ...values, name: "", email: "", password: "" });
				toast.success(response.data.message);
			})
			.catch((error) => {
				console.log(error.response.data);
				toast.error(error.response.data.error);
			});
	};

	const signupForm = () => (
		<div className="bg-grey-lighter h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Sign up</h1>

					<input
						type="text"
						className=" border border-grey-light focus:border-blue-500 w-full p-3 rounded mb-4"
						name="name"
						placeholder="Name"
						onChange={handleChange("name")}
						value={name}
					/>

					<input
						type="text"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="email"
						placeholder="Email"
						onChange={handleChange("email")}
						value={email}
					/>

					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="password"
						placeholder="Password"
						onChange={handleChange("password")}
						value={password}
					/>
					<input
						type="password"
						className="block border border-grey-light w-full p-3 rounded mb-4"
						name="confirm_password"
						placeholder="Confirm Password"
						onChange={handleChange("confirm-password")}
						value={confirmPassword}
					/>

					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none my-1"
						onClick={handleSubmit}
					>
						{buttonText}
					</button>

					<div className="text-center text-sm text-grey-dark mt-4">
						By signing up, you agree to the
						<a
							className="no-underline border-b border-grey-dark text-grey-dark"
							href="."
						>
							<span> Terms of Service</span>
						</a>{" "}
						and
						<a
							className="no-underline border-b border-grey-dark text-grey-dark"
							href="."
						>
							<span> Privacy Policy</span>
						</a>
					</div>
				</div>

				<div className="text-grey-dark mt-6">
					Already have an account?
					<Link
						className="no-underline border-b border-blue text-blue"
						to="../login/"
					>
						<span className=" text-blue-500"> Log in.</span>
					</Link>
				</div>
			</div>
		</div>
	);
	return (
		<Layout>
			<ToastContainer />
			{signupForm()}
		</Layout>
	);
};

export default Signup;
