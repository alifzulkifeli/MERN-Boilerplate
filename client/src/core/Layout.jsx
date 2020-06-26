import React, { Fragment } from "react";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
	const aside = () => (
		<aside
			class="hidden lg:flex flex-col items-center bg-white text-gray-700 shadow
h-full"
		>
			<div class="h-16 flex items-center w-full">
				<Link class="h-6 w-6 mx-auto" to="/">
					<img
						class="h-6 w-6 mx-auto"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
						alt="svelte logo"
					/>
				</Link>
			</div>
			<ul>
				<li class="hover:bg-gray-100">
					<Link
						to="."
						class="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
				<li class="hover:bg-gray-100">
					<Link
						to="."
						class="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
				<li class="hover:bg-gray-100">
					<Link
						to="."
						class="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
			</ul>
			<div class="mt-auto h-16 flex items-center w-full">
				<button
					class="h-16 w-10 mx-auto flex flex justify-center items-center
		w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
				>
					<FaBeer />
				</button>
			</div>
		</aside>
	);

	const topbar = () => (
		<div class="flex-1 flex flex-col">
			<nav class="px-4 flex justify-between bg-white h-16 border-b-2 ">
				<ul class="flex items-center lg:hidden">
					<li class="h-6 w-6">
						<img
							class="h-full w-full mx-auto"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
							alt="svelte logo"
						/>
					</li>
				</ul>
				<ul class="flex items-center">
					<li>
						<h1 class="pl-10 lg:pl-0 text-gray-700">Svelte</h1>
					</li>
				</ul>
				<ul class="flex items-center">
					<li class="pr-4">
						<Link to="/signup">Signup</Link>
					</li>
					<li class="pr-4">
						<Link to="/signin">Signin</Link>
					</li>

					<li class="h-8 w-8">
						<img
							class="h-full w-full rounded-full mx-auto"
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
							alt="profile woman"
						/>
					</li>
				</ul>
			</nav>
			<div className=" overflow-auto">{children}</div>
		</div>
	);

	// const bottom = () =>

	const navbar = () => (
		<div class="h-screen w-screen flex bg-gray-200">
			{aside()}
			{topbar()}
			<nav
				class="fixed bottom-0 w-full h-10 border bg-white lg:hidden flex
		overflow-x-auto"
			>
				<Link
					to="."
					class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					class="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
			</nav>
		</div>
	);
	return (
		<Fragment>
			<div>{navbar()}</div>
		</Fragment>
	);
};

export default Layout;
