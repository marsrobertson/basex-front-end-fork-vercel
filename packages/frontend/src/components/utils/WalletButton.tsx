import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

const WalletButton = () => {
	const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

	// create an ethers provider
	let ethersProvider;

	if (wallet) {
		ethersProvider = new ethers.BrowserProvider(wallet.provider, "any");
	}
	return (
		<button
			className={`btn btn-primary ${wallet ? "hidden" : ""}`}
			disabled={connecting}
			onClick={() => (wallet ? disconnect(wallet) : connect())}
		>
			{connecting ? "connecting" : wallet ? "disconnect" : "connect"}
		</button>
	);
};

export default WalletButton;
