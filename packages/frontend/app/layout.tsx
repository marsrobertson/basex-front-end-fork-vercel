"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import {
	Web3OnboardProvider,
	init,
	useConnectWallet,
} from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "ethers";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "BasedX",
	description: "Work in Progress",
};

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

const injected = injectedModule();

const infuraKey = process.env.NEXT_PUBLIC_INFURA_KEY;
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// initialize Onboard
const web3Onboard = init({
	apiKey,
	wallets: [injected],
	chains: [
		{
			id: "0x1",
			token: "ETH",
			label: "Ethereum Mainnet",
			rpcUrl,
		},
	],
});
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Web3OnboardProvider web3Onboard={web3Onboard}>
				<div>
					<Navbar />
					<body className={inter.className}>{children}</body>
				</div>
			</Web3OnboardProvider>
		</html>
	);
}
