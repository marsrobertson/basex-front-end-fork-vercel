import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractRead } from "wagmi";
import ABI from "../../contracts/ABI";
import ADDRESS from "../../contracts/Address";
import Footer from "./Footer";

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
							<li className="flex justify-center gap-1">
								<a href="/organisations">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="#000000"
										viewBox="0 0 256 256"
									>
										<path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
									</svg>
									Organisations
								</a>
							</li>
							<li className="flex justify-center gap-1">
								<a href="/reports">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="#000000"
										viewBox="0 0 256 256"
									>
										<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
									</svg>
									Reports
								</a>
							</li>
							<li className="flex justify-center gap-1">
								<a href="/evaluations">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="#000000"
										viewBox="0 0 256 256"
									>
										<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
									</svg>
									Evaluations
								</a>
							</li>
						</ul>
					</div>
					<div className="flex-none">
						<ConnectButton />
					</div>
				</div>
				<div className="px-2 flex-grow">{children}</div>
				<Footer />
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 h-full bg-base-200">
					{/* Sidebar content here */}
					<li className="flex justify-center gap-1">
						<a href="/organisations">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="#000000"
								viewBox="0 0 256 256"
							>
								<path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
							</svg>
							Organisations
						</a>
					</li>
					<li className="flex justify-center gap-1">
						<a href="/reports">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="#000000"
								viewBox="0 0 256 256"
							>
								<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
							</svg>
							Reports
						</a>
					</li>
					<li className="flex justify-center gap-1">
						<a href="/evaluations">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								fill="#000000"
								viewBox="0 0 256 256"
							>
								<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H112V200h8a8,8,0,0,0,0-16h-8V168h8a8,8,0,0,0,0-16h-8V136h8a8,8,0,0,0,0-16h-8v-8a8,8,0,0,0-16,0v8H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H88a8,8,0,0,0,0,16h8v16H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
							</svg>
							Evaluations
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Layout;
