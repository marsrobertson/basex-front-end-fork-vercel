import React, { useState } from "react";
import { Report } from "../../types/Report";

const ReportDialog = () => {
	const [open, setOpen] = useState(false);
	const [newReport, setNewReport] = useState<Report>({
		organisation: "",
		title: "",
		comments: "",
		uploadDate: new Date(),
		accountingPeriodStart: new Date(),
		accountingPeriodEnd: new Date(),
		source: "",
		ipfs: "",
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewReport({
			organisation: "",
			title: "",
			comments: "",
			uploadDate: new Date(),
			accountingPeriodStart: new Date(),
			accountingPeriodEnd: new Date(),
			source: "",
			ipfs: "",
		});
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setNewReport((prevReport) => ({
			...prevReport,
			[name]: value,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setNewReport((prevReport) => ({
				...prevReport,
				ipfs: file.name,
			}));
		}
	};

	const handleSubmit = () => {
		// Perform any additional validation or processing here

		handleClose();
	};

	return (
		<>
			<button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
				New Report
			</button>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center z-10">
					<div className="modal modal-open">
						<div className="modal-box">
							<h2 className="text-2xl font-bold">New Report</h2>
							<div className="modal-body">
								<div className="my-2">
									<p className="font-bold my-1">Organisation</p>
									<input
										type="text"
										name="organisation"
										value={newReport.organisation}
										onChange={handleChange}
										className="input input-bordered w-full"
										placeholder="Enter organisation name"
										required
									/>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Title</p>
									<input
										type="text"
										name="title"
										value={newReport.title}
										onChange={handleChange}
										className="input input-bordered w-full"
										placeholder="Enter report title"
										required
									/>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Comments</p>
									<textarea
										name="comments"
										value={newReport.comments}
										onChange={handleChange}
										className="textarea textarea-bordered w-full"
										placeholder="Enter comments"
									></textarea>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Add File</p>
									<input
										type="file"
										name="ipfs"
										onChange={handleFileChange}
										className="file-input file-input-bordered w-full max-w-xs"
										accept=".pdf,.doc,.docx"
									/>
								</div>
								{/* Add other form fields here */}
							</div>
							<div className="modal-footer space-x-2 text-right mt-3">
								<button className="btn" onClick={handleClose}>
									Cancel
								</button>
								<button className="btn btn-primary" onClick={handleSubmit}>
									Save
								</button>
							</div>
						</div>
					</div>
					<div className="modal-backdrop"></div>
				</div>
			)}
		</>
	);
};

export default ReportDialog;
