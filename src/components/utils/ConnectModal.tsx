import CustomConnect from "./CustomConnect";

const ConnectModal = ({ ref, handleClose }: any) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-20">
			<div className="modal modal-open">
				<div className="modal-box" ref={ref}>
					<button
						onClick={handleClose}
						className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
					>
						✕
					</button>
					<h2 className="text-2xl font-bold">Connect Wallet</h2>
					<div className="modal-body">
						<p className="mb-4">Please connect your wallet to proceed.</p>
					</div>
					<div className="modal-footer justify-end flex space-x-2 text-right mt-3">
						<button className="btn" onClick={handleClose}>
							Cancel
						</button>
						<CustomConnect />
					</div>
				</div>
			</div>
			<div className="modal-backdrop"></div>
		</div>
	);
};

export default ConnectModal;
