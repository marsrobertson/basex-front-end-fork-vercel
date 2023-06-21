/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import { Report } from "../../types/Report";
import { useOnClickOutside } from "usehooks-ts";
import FileUpload from "../FileUpload";
import KlerosIPFSService from "../../services/IPFSService";
import { useContractWrite } from "wagmi";
import ADDRESS from "../../contracts/Address";
import ABI from "../../contracts/ABI";
import GUIDService from "../../services/GUIDService";
import { parseEther } from "viem";
import { useTransactor } from "../../hooks/useTransactor";

const ReportDialog = () => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const writeTx = useTransactor();
	//@ts-ignore
	const contractAddReport = useContractWrite({
		address: ADDRESS,
		abi: ABI,
		functionName: "addReport",
	});
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

	useOnClickOutside(ref, () => {
		handleClose();
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setNewReport((prevReport) => ({
			...prevReport,
			[name]: value,
		}));
	};

	const handleFileChange = async (ipfsHash: string) => {
		setNewReport((prevReport) => ({
			...prevReport,
			ipfs: ipfsHash,
		}));
	};

	const handleSubmit = async () => {
		try {
			const item = {
				columns: [
					{
						label: "Title",
						description: "...",
						type: "text",
						isIdentifier: true,
					},
					{
						label: "Source",
						description: "...",
						type: "text",
						isIdentifier: false,
					},
					// Add other columns here
				],
				values: {
					Title: newReport.title,
					Source: newReport.source,
					Report: newReport.ipfs,
					// Set other values based on the form inputs
				},
			};

			const itemJson = JSON.stringify(item);
			const response = await KlerosIPFSService.publishToKlerosNode(
				"item.json",
				new TextEncoder().encode(itemJson)
			);

			// Handle the response from IPFS, e.g., save the hash
			//@ts-ignore
			console.log(response[0].hash);

			// THE CONTRACT CALL PARAMS
			const params = {
				reportGuid: GUIDService.createGUID(),
				orgIndex: 0,
				//@ts-ignore
				JSONIPFS: response[0].hash,
				PVTval: 0,
				NVTval: 0,
			};

			//@ts-ignore
			await writeTx(
				contractAddReport.writeAsync({
					args: [
						params.reportGuid,
						params.orgIndex,
						params.JSONIPFS,
						params.PVTval,
						params.NVTval,
					],
					value: parseEther("0.08"),
				}),
				{ onBlockConfirmation: () => handleClose() }
			);
		} catch (error) {
			// Handle error during upload
			console.error("Error uploading report", error);
		}
	};

	return (
		<>
			<button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
				New Report
			</button>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center z-10">
					<div className="modal modal-open">
						<div className="modal-box" ref={ref}>
							<button
								onClick={handleClose}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								✕
							</button>
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
									<FileUpload onUpload={handleFileChange} />
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
