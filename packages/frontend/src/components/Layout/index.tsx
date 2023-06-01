import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<div className="navbar bg-base-100">
				<a className="btn btn-ghost normal-case text-xl">BasedX</a>
			</div>
			{children}
		</div>
	);
};

export default Layout;
