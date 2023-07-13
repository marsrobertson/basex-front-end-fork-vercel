import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractRead } from "wagmi";
import ABI from "../../contracts/ABI";
import ADDRESS from "../../contracts/Address";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const getOrganisations = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getOrganisations",
	});

	useEffect(() => {
		if (getOrganisations.data) {
			localStorage.setItem(
				"organisationsData",
				JSON.stringify(
					getOrganisations.data,
					(_key, value) =>
						typeof value === "bigint" ? value.toString() : value // return everything else unchanged)
				)
			);
		}
	}, [getOrganisations.data]);
	return (
		<div className="drawer">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div className="w-full navbar bg-base-100 shadow-md">
					<div className="flex-none lg:hidden">
						<label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-6 h-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</label>
					</div>
					<div className="flex-1 px-2 mx-2 text-2xl font-semibold">
						<a href="/">BaseX</a>
					</div>
					<div className="flex-none hidden lg:block">
						<ul className="menu menu-horizontal">
							<li>
								<a href="/reports">Reports</a>
							</li>
							<li>
								<a href="/organisations">Organisations</a>
							</li>
							<li>
								<a href="/evaluations">Evaluations</a>
							</li>
						</ul>
					</div>
					<div className="flex-none">
						<ConnectButton />
					</div>
				</div>
				{children}
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 h-full bg-base-200">
					{/* Sidebar content here */}
					<li>
						<a href="/reports">Reports</a>
					</li>
					<li>
						<a href="/organisations">Organisations</a>
					</li>
					<li>
						<a href="/evaluations">Evaluations</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Layout;
