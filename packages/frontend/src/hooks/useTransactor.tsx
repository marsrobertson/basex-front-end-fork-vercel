/* eslint-disable @typescript-eslint/ban-ts-comment */
import { WriteContractResult, getPublicClient } from "@wagmi/core";
import {
	Hash,
	SendTransactionParameters,
	TransactionReceipt,
	WalletClient,
} from "viem";
import { useWalletClient } from "wagmi";
import { getParsedError } from "../utils/contractUtils";
import { notification } from "../utils/notification";
import { getBlockExplorerTxLink } from "../utils/networks";

type TransactionFunc = (
	tx: Promise<WriteContractResult> | SendTransactionParameters,
	options?: {
		onBlockConfirmation?: (txnReceipt: TransactionReceipt) => void;
		blockConfirmations?: number;
	}
) => Promise<Hash | undefined>;

/**
 * Custom notification content for TXs.
 */
// eslint-disable-next-line react-refresh/only-export-components
const TxnNotification = ({
	message,
	blockExplorerLink,
}: {
	message: string;
	blockExplorerLink?: string;
}) => {
	return (
		<div className={`flex flex-col ml-1 cursor-default`}>
			<p className="my-0">{message}</p>
			{blockExplorerLink && blockExplorerLink.length > 0 ? (
				<a
					href={blockExplorerLink}
					target="_blank"
					rel="noreferrer"
					className="block underline text-md"
				>
					check out transaction
				</a>
			) : null}
		</div>
	);
};

/**
 * @description Runs Transaction passed in to returned funtion showing UI feedback.
 * @param _walletClient
 * @returns function that takes a transaction and returns a promise of the transaction hash
 */
export const useTransactor = (
	_walletClient?: WalletClient
): TransactionFunc => {
	let walletClient = _walletClient;
	const { data } = useWalletClient();
	if (walletClient === undefined && data) {
		walletClient = data;
	}

	const result: TransactionFunc = async (tx, options) => {
		if (!walletClient) {
			notification.error("Cannot access account");
			// console.error("⚡️ ~ file: useTransactor.tsx ~ error");
			return;
		}

		let notificationId = null;
		let transactionHash:
			| Awaited<WriteContractResult>["hash"]
			| undefined = undefined;
		try {
			const network = await walletClient.getChainId();
			// Get full transaction from public client
			const publicClient = getPublicClient();

			notificationId = notification.loading(
				<TxnNotification message="Awaiting for user confirmation" />
			);
			if (tx instanceof Promise) {
				// Tx is already prepared by the caller
				transactionHash = (await tx).hash;
			} else if (tx != null) {
				transactionHash = await walletClient.sendTransaction(tx);
			} else {
				throw new Error("Incorrect transaction passed to transactor");
			}
			notification.remove(notificationId);
			//@ts-ignore
			const blockExplorerTxURL = network
				? getBlockExplorerTxLink(network, transactionHash)
				: "";

			notificationId = notification.loading(
				<TxnNotification
					message="Waiting for transaction to complete."
					blockExplorerLink={blockExplorerTxURL}
				/>
			);

			const transactionReceipt = await publicClient.waitForTransactionReceipt({
				hash: transactionHash,
				confirmations: options?.blockConfirmations,
			});
			notification.remove(notificationId);

			notification.success(
				<TxnNotification
					message="Transaction completed successfully!"
					blockExplorerLink={blockExplorerTxURL}
				/>,
				{
					icon: "🎉",
				}
			);

			if (options?.onBlockConfirmation)
				options.onBlockConfirmation(transactionReceipt);
		} catch (error) {
			if (notificationId) {
				notification.remove(notificationId);
			}
			// TODO handle error properly
			console.error("⚡️ ~ file: useTransactor.ts ~ error", error);
			const message = getParsedError(error);
			notification.error(message);
		}

		return transactionHash;
	};

	return result;
};
