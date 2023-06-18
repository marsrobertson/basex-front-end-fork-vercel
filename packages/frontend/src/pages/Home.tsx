import { useWalletClient } from "wagmi";
import FileUpload from "../components/FileUpload";

const HomePage = () => {
	const { data: walletClient, isError, isLoading } = useWalletClient();

	const handleSignMessage = async () => {
		try {
			const message = "Hello BaseX";
			await walletClient?.signMessage({ message });
			// Perform any additional logic with the signature
		} catch (error) {
			console.error("Error signing message:", error);
			// Handle the error
		}
	};

	return (
		<div className="text-center">
			<h1 className="my-3 text-3xl font-bold">Home</h1>
			{isLoading && (
				<div className="mx-auto my-2">
					<span className="loading loading-bars loading-lg"></span>
				</div>
			)}
			{isError && (
				<div className="my-3 text-lg font-semibold">
					<h5>Couldn't fetch wallet</h5>
				</div>
			)}
			{walletClient && (
				<div className="text-center mx-auto">
					<h4>Hello {walletClient.account.address}</h4>
					<button className="btn btn-neutral my-4" onClick={handleSignMessage}>
						Sign a message
					</button>
					<FileUpload
						onUpload={(hash) => {
							console.log(hash);
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default HomePage;
