import React, { Fragment, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "./../auth/helpers";

const Layout = ({ children, match, history }) => {
	const [dropdown, setDropdown] = useState(false);

	const handleDropdownClick = () => setDropdown(!dropdown);

	const isActive = (path) => {
		if (match.path === path) return "text-orange-500";
	};
	const aside = () => (
		<aside
			className="hidden lg:flex flex-col items-center bg-white text-gray-700 shadow
h-full"
		>
			<div className="h-16 flex items-center w-full">
				<Link className="h-6 w-6 mx-auto" to="/">
					<img
						className="h-6 w-6 mx-auto"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
						alt="svelte logo"
					/>
				</Link>
			</div>
			<ul>
				<li className="hover:bg-gray-100">
					<Link
						to="."
						className="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
				<li className="hover:bg-gray-100">
					<Link
						to="."
						className="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
				<li className="hover:bg-gray-100">
					<Link
						to="."
						className="h-16 px-6 flex flex justify-center items-center w-full
			focus:text-orange-500"
					>
						<FaBeer />
					</Link>
				</li>
			</ul>
			<div className="mt-auto h-16 flex items-center w-full">
				<button
					className="h-16 w-10 mx-auto flex flex justify-center items-center
		w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
				>
					<FaBeer />
				</button>
			</div>
		</aside>
	);

	const topbar = () => (
		<div className="flex-1 flex flex-col">
			<nav className="px-4 flex justify-between bg-white h-16 border-b-2 ">
				<ul className="flex items-center lg:hidden">
					<li className="h-6 w-6">
						<img
							className="h-full w-full mx-auto"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
							alt="svelte logo"
						/>
					</li>
				</ul>
				<ul className="flex items-center">
					<li>
						<h1 className="pl-10 lg:pl-0 text-gray-700">Svelte</h1>
					</li>
				</ul>
				<ul className="flex items-center">
					{!isAuth() ? (
						<Fragment>
							{" "}
							<li className="pr-4 focus:text-orange-500">
								<Link
									to="/signup"
									className={` text-gray-700  ${isActive("/signup")}`}
								>
									Signup
								</Link>
							</li>
							<li className="pr-4">
								<Link
									to="/signin"
									className={` text-gray-700  ${isActive("/signin")}`}
								>
									Signin
								</Link>
							</li>
						</Fragment>
					) : (
						<Fragment>
							{" "}
							<span className=" mr-5 text-lg  text-gray-700  lg:flex hidden">
								{isAuth().name}
							</span>
							<div className="relative inline-block text-left">
								<div>
									<span className="rounded-md shadow-sm">
										<div className="h-8 w-8 ">
											<img
												onClick={handleDropdownClick}
												className="h-full w-full rounded-full mx-auto cursor-pointer"
												src={isAuth().picture}
												alt="profile woman"
											/>
										</div>
									</span>
								</div>
								<div
									className={
										dropdown
											? "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg block"
											: "origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg hidden"
									}
								>
									<div className="rounded-md bg-white shadow-xs">
										<div className="py-1">
											<Link
												to="/profile"
												className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
											>
												Profile
											</Link>
											<a
												href="."
												className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
											>
												Api
											</a>
										</div>

										<div className="border-t border-gray-100"></div>
										<div className="py-1">
											<span
												className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 cursor-pointer
											 "
												onClick={() => {
													signout(() => {
														history.push("/");
													});
												}}
											>
												Sign out
											</span>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</ul>
			</nav>
			<div className=" overflow-auto">{children}</div>
		</div>
	);

	// const bottom = () =>

	const navbar = () => (
		<div className="h-screen w-screen flex bg-gray-200">
			{aside()}
			{topbar()}
			<nav
				className="fixed bottom-0 w-full h-10 border bg-white lg:hidden flex
		overflow-x-auto"
			>
				<Link
					to="."
					className="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					className="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					className="flex flex-col flex-grow items-center justify-center
			overflow-hidden whitespace-no-wrap text-sm transition-colors
			duration-100 ease-in-out hover:bg-gray-200 focus:text-orange-500"
				>
					<FaBeer />
				</Link>
				<Link
					to="."
					className="flex flex-col flex-grow items-center justify-center
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

export default withRouter(Layout);
