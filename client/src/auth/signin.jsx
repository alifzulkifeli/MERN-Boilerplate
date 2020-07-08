import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authenticate, isAuth } from "./helpers";

const Signin = ({ history }) => {
	const [values, setValues] = useState({
		email: "alifzulkifeli@gmail.com",
		password: "aiman987",
		buttonText: "Sign In",
	});

	const { email, password, buttonText } = values;

	const handleChange = (input) => (event) => {
		setValues({ ...values, [input]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, buttonText: "Signing in..." });
		axios({
			method: "POST",
			url: `${process.env.REACT_APP_API}/signin`,
			data: { email, password },
		})
			.then((response) => {
				console.log(response);
				authenticate(response, () => {
					setValues({
						...values,
						email: "",
						password: "",
						buttonText: "Sign in",
					});
					//toast.success(`Hey ${response.data.user.name}. Welcome back`);
					isAuth() && isAuth().role === "admin"
						? history.push("/admin")
						: history.push("/");
				});
			})
			.catch((error) => {
				console.log(error.response);
				setValues({ ...values, buttonText: "Sign in" });
				toast.error(error.response.data.error);
			});
	};

	const signupForm = () => (
		<div className="bg-grey-lighter h-screen flex flex-col">
			<div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
				<div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
					<h1 className="mb-8 text-3xl text-center">Sign in</h1>
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
					<button
						type="submit"
						className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-700 focus:outline-none my-1"
						onClick={handleSubmit}
					>
						{buttonText}
					</button>{" "}
					<Link to="/password/forgot">
						<span className="text-gray-600  text-sm">forgot password?</span>
					</Link>
					<div className="text-center text-sm text-grey-dark mt-4">
						By signing in, you agree to the
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
					Did not have an account?
					<Link
						className="no-underline border-b border-blue text-blue"
						to="../signup/"
					>
						<span className=" text-blue-500"> Sign up.</span>
					</Link>
				</div>
			</div>
		</div>
	);
	return (
		<Layout>
			<ToastContainer />
			{isAuth() ? <Redirect to="/" /> : null}
			{signupForm()}
		</Layout>
	);
};

export default Signin;
