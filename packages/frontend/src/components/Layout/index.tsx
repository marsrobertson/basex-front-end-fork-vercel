import React from "react";
import WalletButton from "../utils/WalletButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div className="navbar bg-base-100 py-8">
				<div className="flex-1">
					<a className=" normal-case text-xl">BasedX</a>
				</div>
				<div className="flex-none">
					<WalletButton />
				</div>
			</div>
			{children}
		</div>
	);
};

export default Layout;
