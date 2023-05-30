"use client";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import React from "react";

const Navbar = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	// create an ethers provider
	let ethersProvider;

	if (wallet) {
		ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
	}

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">BasedX</a>
			</div>
			<div className="flex-none">
				<button
					className="btn btn-primary"
					disabled={connecting}
					onClick={() => (wallet ? disconnect(wallet) : connect())}
				>
					{connecting ? "connecting" : wallet ? "disconnect" : "connect"}
				</button>
			</div>
		</div>
	);
};

export default Navbar;
