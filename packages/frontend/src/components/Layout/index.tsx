import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
					<div className="flex-1 px-2 mx-2 text-2xl font-semibold">BaseX</div>
					<div className="flex-none hidden lg:block">
						<ul className="menu menu-horizontal">
							<li>
								<a href="/reports">Reports</a>
							</li>
							<li>
								<a href="/organizations">Organizations</a>
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
						<a href="/organizations">Organizations</a>
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
