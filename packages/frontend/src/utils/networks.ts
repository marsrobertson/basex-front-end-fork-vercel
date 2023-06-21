import * as chains from "wagmi/chains";
/**
 * Gives the block explorer transaction URL.
 * @param network
 * @param txnHash
 * @dev returns empty string if the network is localChain
 */
export function getBlockExplorerTxLink(chainId: number, txnHash: string) {
	const chainNames = Object.keys(chains);

	const targetChainArr = chainNames.filter((chainName) => {
		const wagmiChain = chains[chainName as keyof typeof chains];
		return wagmiChain.id === chainId;
	});

	if (targetChainArr.length === 0) {
		return "";
	}

	const targetChain = targetChainArr[0] as keyof typeof chains;
	// @ts-expect-error : ignoring error since `blockExplorers` key may or may not be present on some chains
	const blockExplorerTxURL = chains[targetChain]?.blockExplorers?.default?.url;

	if (!blockExplorerTxURL) {
		return "";
	}

	return `${blockExplorerTxURL}/tx/${txnHash}`;
}
