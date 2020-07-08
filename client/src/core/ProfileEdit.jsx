import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { isAuth } from "../auth/helpers";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie, setCookie, setLocalStorage } from "./../auth/helpers";
import { ToastContainer, toast } from "react-toastify";

const ProfileEdit = ({ history }) => {
	const [data, setData] = useState({
		email: "",
		name: "",
		picture: "",
		role: "",
		_id: "",
	});

	const { email, name, picture, role, _id } = data;

	useEffect(() => {
		loadProfile();
	}, []);

	const loadProfile = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_API}/user/read/${isAuth()._id}`,
			headers: {
				Authorization: "Bearer " + getCookie("token"),
			},
		})
			.then((response) => {
				console.log(response.data);
				const value = response.data;
				setData({
					...data,
					name: value.name,
					email: value.email,
					picture: value.picture,
					role: value.role,
					_id: value._id,
				});
				setLocalStorage("user", {
					...data,
					name: value.name,
					email: value.email,
					picture: value.picture,
					role: value.role,
					_id: value._id,
				});
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	const handleChange = (input) => (event) => {
		setData({ ...data, [input]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios({
			method: "PUT",
			url: `${process.env.REACT_APP_API}/user/update`,
			headers: {
				Authorization: "Bearer " + getCookie("token"),
			},
			data: { name },
		})
			.then((response) => {
				console.log(response);
				setData({ ...data, name: response.data.name });
				setLocalStorage("user", {
					...data,
					name: response.data.name,
				});
				history.push("/profile");
			})
			.catch((error) => {
				console.log(error.response);

				toast.error(error.response.data.error);
			});
	};

	return (
		<Layout>
			<ToastContainer />
			<div class="p-5">
				<div class="mx-4 p-4">
					<div class="flex items-center">
						<div class="flex items-center text-gray-500 relative">
							<img src={picture} alt="" />
						</div>
					</div>
				</div>
				<div class="mt-8 p-4">
					<div>
						<div class="flex flex-col md:flex-row">
							<div class="w-full mx-2 flex-1 svelte-1l8159u">
								<div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
									{" "}
									Name
								</div>
								<div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
									<input
										placeholder="Just a hint.."
										class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
										value={name}
										onChange={handleChange("name")}
									/>{" "}
								</div>
							</div>
							<div class="w-full mx-2 flex-1 svelte-1l8159u">
								<div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
									{" "}
									Email
								</div>
								<div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
									<input
										placeholder="jhon@doe.com"
										class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
										value={email}
										onChange={handleChange("email")}
										readOnly
									/>{" "}
								</div>
							</div>
						</div>
						<button
							onClick={handleSubmit}
							class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-2 py-2 px-4 border border-blue-500 hover:border-transparent rounded"
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ProfileEdit;
