/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import { Report } from "../../types/Report";
import { useOnClickOutside } from "usehooks-ts";
import FileUpload from "../FileUpload";
import KlerosIPFSService from "../../services/IPFSService";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import ADDRESS from "../../contracts/Address";
import ABI from "../../contracts/ABI";
import GUIDService from "../../services/GUIDService";
import { parseEther } from "viem";
import { useTransactor } from "../../hooks/useTransactor";
import { Organisation } from "../../types/Organisation";
import ConnectModal from "../utils/ConnectModal";
import { useSetAtom } from "jotai";
import { reloadReports } from "../../atoms/reloadTriggers";
interface FieldErrors {
    organisationGUID?: string;
    title?: string;
    ipfs?: string;
}
const ReportDialog = () => {
    const setReloadReports = useSetAtom(reloadReports);
    const [open, setOpen] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
	const ref = useRef(null);
	const { address } = useAccount();
	const [loading, setLoading] = useState(false);
	const writeTx = useTransactor();
	//@ts-ignore
	const contractAddReport = useContractWrite({
		address: ADDRESS,
		abi: ABI,
		functionName: "addItem",
	});
	const getOrganisations = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getOrganisations",
	});
	const [newReport, setNewReport] = useState<Report>({
		organisationGUID: "",
		title: "",
		comments: "",
		uploadDate: new Date(),
		accountingPeriodStart: new Date(),
		accountingPeriodEnd: new Date(
			new Date().getTime() + 10 * 24 * 60 * 60 * 1000
		),
		source: "",
		ipfs: "",
		reportGUID: "",
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewReport({
			organisationGUID: "",
			title: "",
			comments: "",
			uploadDate: new Date(),
			accountingPeriodStart: new Date(),
			accountingPeriodEnd: new Date(),
			source: "",
			ipfs: "",
			reportGUID: "",
		});
	};

	useOnClickOutside(ref, () => {
		handleClose();
	});

	const handleChange = (
		event: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
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
        const errors: FieldErrors = {};

    if (!newReport.organisationGUID) {
        errors.organisationGUID = "Organisation is required";
    }
    if (!newReport.title) {
        errors.title = "Title is required";
    }
    if (!newReport.ipfs) {
        errors.ipfs = "File upload is required";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
        return; // Don't proceed with submission
    }

    try {
        setLoading(true);
        // ... (rest of your handleSubmit logic)
    } catch (error) {
        setLoading(false);
        console.error("Error uploading report", error);
    }
		try {
			setLoading(true);
			const item = {
				columns: [
					{
						label: "Title",
						description: "...",
						type: "text",
						isIdentifier: true,
					},
					{
						label: "Comments",
						description: "...",
						type: "text",
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
					Comments: newReport.comments,
					Source: newReport.source,
					Report: newReport.ipfs,
					"Start Date": new Date(),
					"End Date": new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
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
			//@ts-ignore
			const organizationIndex = getOrganisations.data.findIndex(
				(organization: Organisation) =>
					organization.orgGuid === newReport.organisationGUID
			);
			// THE CONTRACT CALL PARAMS
			const params = {
				itemGuid: GUIDService.createGUID(),
				targetGuid: newReport.organisationGUID,
				orgIndex: organizationIndex,
				//@ts-ignore
				JSONIPFS: `/ipfs/${response[0].hash}`,
				PVTval: 0,
				NVTval: 0,
			};

			//@ts-ignore
			await writeTx(
				contractAddReport.writeAsync({
					args: [
						params.itemGuid,
						params.targetGuid,
						params.orgIndex,
						params.JSONIPFS,
						params.PVTval,
						params.NVTval,
					],
					value: parseEther("0.08"),
				}),
				{ onBlockConfirmation: () => handleClose() }
			);
            setLoading(false);
            setReloadReports(true);
			handleClose();
		} catch (error) {
			setLoading(false);
			// Handle error during upload
			console.error("Error uploading report", error);
		}
	};

	return (
		<>
			<button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
				New Report
			</button>
			{open && !address && <ConnectModal {...{ ref, handleClose }} />}
			{open && address && (
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
									{/* <input
										type="text"
										name="organisation"
										value={newReport.organisation}
										onChange={handleChange}
										className="input input-bordered w-full"
										placeholder="Enter organisation name"
										required
									/> */}
									<select
										name="organisationGUID"
										className={`select select-bordered w-full ${fieldErrors.organisationGUID ? 'input-error' : ''}`}
                                        value={newReport.organisationGUID}
                                        onChange={handleChange}
                                        required
									>
										<option disabled value="">
											Select organisation to report on
										</option>
										{
											//@ts-ignore
											getOrganisations.data?.map(
												(organisation: Organisation) => (
													<option
														key={organisation.orgGuid}
														value={organisation.orgGuid}
													>
														{organisation.name}
													</option>
												)
											)
										}
                                    </select>
                                    {fieldErrors.organisationGUID && <p className="text-red-600 my-1">{fieldErrors.organisationGUID}</p>}
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Title</p>
									<input
										type="text"
										name="title"
										value={newReport.title}
										onChange={handleChange}
										className={`input input-bordered w-full ${fieldErrors.title ? 'input-error' : ''}`}
										placeholder="Enter report title"
										required
                                    />
                                       {fieldErrors.title && <p className="text-red-600 my-1">{fieldErrors.title}</p>}
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
                                    <FileUpload onUpload={handleFileChange} required />
                                     {fieldErrors.ipfs && <p className="text-red-600">{fieldErrors.ipfs}</p>}
								</div>
								{/* Add other form fields here */}
							</div>
							<div className="modal-footer space-x-2 text-right mt-3">
								<button className="btn" onClick={handleClose}>
									Cancel
								</button>
								<button
									className="btn btn-primary"
									onClick={handleSubmit}
									disabled={loading}
								>
									{!loading ? "Save" : "Loading"}
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
