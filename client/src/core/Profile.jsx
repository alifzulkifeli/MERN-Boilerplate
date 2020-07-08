import React from "react";
import Layout from "./Layout";
import { isAuth } from "../auth/helpers";
import { Link } from "react-router-dom";

const Private = () => {
	const { email, name, picture, role } = isAuth();
	return (
		<Layout>
			<div>
				<div className="w-full h-full  flex flex-row flex-wrap p-3">
					<div className="mx-auto w-2/3">
						<div className="rounded-lg shadow-lg bg-green-600 w-full flex flex-row flex-wrap p-3 antialiased">
							<div className="md:w-1/3 w-full">
								<img
									className="rounded-lg shadow-lg antialiased"
									alt="profile"
									src={picture}
								/>
							</div>
							<div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
								<div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
									<div className="text-2xl text-white leading-tight">
										{role}
									</div>
									<div className="text-normal text-gray-300 hover:text-gray-400 cursor-pointer">
										<span className="border-b border-dashed border-gray-500 pb-1">
											{name}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="w-full text-right text-gray-700 font-semibold relative pt-3 md:pt-0">
							<Link
								className="text-xl text-red-600 leading-tight"
								to="/profile/edit"
							>
								edit
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Private;
