/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import { Evaluation } from "../../types/Evaluation";
import { Report } from "../../types/Report";
import { useOnClickOutside } from "usehooks-ts";
import KlerosIPFSService from "../../services/IPFSService";
import GUIDService from "../../services/GUIDService";
import { Organisation } from "../../types/Organisation";
import { parseEther } from "viem";
import ABI_prod from "../../contracts/ABI_prod";
import ADDRESS_prod from "../../contracts/Address_prod";
import ABI_staging from "../../contracts/ABI_staging";
import ADDRESS_staging from "../../contracts/Address_staging";
import { useAccount, useContractWrite } from "wagmi";
import { useTransactor } from "../../hooks/useTransactor";
import ConnectModal from "../utils/ConnectModal";
import {
	EvaluationCategories,
	planetaryBoundaries,
} from "../../utils/categoriesEval";

const STAGING = import.meta.env.VITE_STAGING;
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const EvaluationDialog = ({
	report,
	organisation,
}: {
	report: Report;
	organisation: Organisation;
}) => {
	const writeTx = useTransactor();
	const { address } = useAccount();
	//@ts-ignore
	const contractAddEval = useContractWrite({
		address: ADDRESS,
		abi: ABI,
		functionName: "addItem",
	});
	const [open, setOpen] = useState(false);
	const ref = useRef(null);
	const [loading, setLoading] = useState(false);
	const [newEvaluation, setNewEvaluation] = useState<Evaluation>({
		organisationGUID: report.organisationGUID,
		targetGUID: report.reportGUID,
		reportTitle: report.title,
		nvt: 0,
		pvt: 0,
		justificationType: "SDG",
		evaluationContent: {
			comments: "",
			planetJustifications: Array.from({ length: 17 }, (_, index) => ({
				comment: "",
				percentage: 0,
				planetImage: `/img/sdgs/sdg${index + 1}.png`,
			})),
		},
		author: "",
		date: new Date(),
	});
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
		setNewEvaluation({
			organisationGUID: "",
			reportTitle: "",
			targetGUID: "",
			nvt: 0,
			pvt: 0,
			evaluationContent: {
				comments: "",
				planetJustifications: Array.from({ length: 17 }, (_, index) => ({
					comment: "",
					percentage: 0,
					planetImage: `/img/sdgs/sdg${index + 1}.png`,
				})),
			},
			author: "",
			date: new Date(),
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
		if (name === "comments") {
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				evaluationContent: {
					...prevEvaluation.evaluationContent,
					comments: value,
				},
			}));
		}
		if (name.includes("planetJustifications")) {
			// Handle changes in the planetJustifications fields
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_fieldName, indexString, fieldType] = name.split("-");
			const index = Number(indexString);
			const field = fieldType === "comment" ? "comment" : "percentage";
			const updatedPlanetJustifications = [
				...(newEvaluation?.evaluationContent?.planetJustifications ?? []),
			];
			updatedPlanetJustifications[index] = {
				...updatedPlanetJustifications[index],
				[field]: value,
			};
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				evaluationContent: {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					...prevEvaluation.evaluationContent!,
					planetJustifications: updatedPlanetJustifications ?? [],
				},
			}));
		} else if (name === "pvt" || name === "nvt") {
			// Handle changes in pvt and nvt fields, validating the input as an integer greated than 0
			const intValue = parseInt(value);
			if (!Number.isNaN(intValue) && intValue >= 0) {
				setNewEvaluation((prevEvaluation) => ({
					...prevEvaluation,
					[name]: intValue,
				}));
			}
		} else {
			// Handle changes in other fields
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				[name]: value,
			}));
		}
		if (name === "justificationType") {
			switch (value) {
				case "SDG": {
					setNewEvaluation((prevEvaluation) => ({
						...prevEvaluation,
						evaluationContent: {
							...prevEvaluation.evaluationContent,
							planetJustifications: Array.from({ length: 17 }, (_, index) => ({
								comment: "",
								percentage: 0,
								planetImage: `/img/sdgs/sdg${index + 1}.png`,
							})),
							comments: prevEvaluation?.evaluationContent?.comments || "", // Provide a default value
						},
					}));

					break;
				}
				case "EBF": {
					setNewEvaluation((prevEvaluation) => ({
						...prevEvaluation,
						evaluationContent: {
							...prevEvaluation.evaluationContent,
							planetJustifications: Array.from({ length: 6 }, (_, index) => ({
								comment: "",
								percentage: 0,
								planetImage: `/img/ebfs/ebf-${index + 1}.svg`,
							})),
							comments: prevEvaluation?.evaluationContent?.comments || "", // Provide a default value
						},
					}));
					break;
				}
				case "Planetary Boundaries": {
					setNewEvaluation((prevEvaluation) => ({
						...prevEvaluation,
						evaluationContent: {
							...prevEvaluation.evaluationContent,
							planetJustifications: Array.from({ length: 6 }, (_, index) => ({
								comment: "",
								percentage: 0,
								planetImage: "planetary",
							})),
							comments: prevEvaluation?.evaluationContent?.comments || "", // Provide a default value
						},
					}));
					break;
				}
			}
		}
	};

	const handleSliderChange = (index: number, value: number) => {
		const updatedPlanetJustifications = [
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			...newEvaluation!.evaluationContent!.planetJustifications!,
		];
		updatedPlanetJustifications[index] = {
			...updatedPlanetJustifications[index],
			percentage: value,
		};
		setNewEvaluation((prevEvaluation) => ({
			...prevEvaluation,
			evaluationContent: {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				...prevEvaluation.evaluationContent!,
				planetJustifications: updatedPlanetJustifications,
			},
		}));
	};

	const handleSubmit = async () => {
		// Perform any additional validation or processing here
		try {
			setLoading(true);
			const itemGUID = GUIDService.createGUID();
			const item = {
				columns: [
					{
						label: "Title",
						description: "...",
						type: "text",
						isIdentifier: true,
					},
					{
						label: "Source URL",
						description: "...",
						type: "text",
						isIdentifier: false,
					},
					{
						label: "Start Date",
						description: "...",
						type: "number",
					},
					{
						label: "End Date",
						description: "...",
						type: "number",
					},
					{
						label: "File",
						description: "...",
						type: "file",
						allowedFileTypes: "pdf",
					},
					{
						label: "Comments",
						description: "...",
						type: "text",
					},
					{
						label: "GUID",
						description: "The GUID of this item",
						type: "text",
					},
					{
						label: "GUID Target",
						description:
							"In case of the evaluation, we refer to the GUID of the item",
						type: "text",
					},
					{
						label: "Positive Value",
						description: "PVT",
						type: "number",
					},
					{
						label: "Negative Value",
						description: "NVT",
						type: "number",
					},

					{
						label: "SDG1 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG1 Comment",
						description: "...",
						type: "text",
					},
					{
						label: "SDG2 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG2 Comment",
						description: "...",
						type: "text",
					},
					{
						label: "SDG3 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG3 Comment",
						description: "...",
						type: "text",
					},
					{
						label: "SDG4 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG4 Comment",
						description: "...",
						type: "text",
					},
					{
						label: "SDG15 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG5 Comment",
						description: "...",
						type: "text",
					},
					{
						label: "SDG6 Value",
						description: "...",
						type: "number",
					},
					{
						label: "SDG6 Comment",
						description: "...",
						type: "text",
					},
				],
				values: {
					Title: `Evaluation for ${report.title}`,
					"Source URL": "",
					File: "",
					Comments: newEvaluation?.evaluationContent?.comments,
					"Start Date": newEvaluation.date,
					"End Date": new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
					"Upload Date": new Date(),
					"Positive Value": newEvaluation.pvt ?? 0,
					"Negative Value": newEvaluation.nvt ?? 0,
					GUID: itemGUID,
					justificationType: newEvaluation.justificationType,
					"GUID Target": report.reportGUID,
					...newEvaluation?.evaluationContent?.planetJustifications?.reduce(
						(acc, justification, index) => {
							const sdgValueKey = `SDG${index + 1} Value`;
							const sdgCommentKey = `SDG${index + 1} Comment`;
							return {
								...acc,
								[sdgValueKey]: justification.percentage,
								[sdgCommentKey]: justification.comment,
							};
						},
						{}
					),
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
				itemGuid: itemGUID,
				itemName: `Evaluation for ${report.title}`,
				targetGuid: report.reportGUID,
				orgIndex: organisation.id,
				//@ts-ignore
				JSONIPFS: `/ipfs/${response[0].hash}`,
				PVTval: newEvaluation.pvt,
				NVTval: newEvaluation.nvt,
			};

			await writeTx(
				contractAddEval.writeAsync({
					args: [
						params.itemGuid,
						params.itemName,
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
		} catch (error) {
			console.log("Couldn't upload evaluation", error);
			setLoading(false);
		}
	};

	return (
		<>
			<button className="btn btn-primary" onClick={handleOpen}>
				Evaluate
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
							<h2 className="text-2xl font-bold">{organisation.name}</h2>
							<div className="modal-body">
								<div className="mb-4 text-black/60">
									<h4 className="text-lg">{report.title}</h4>
									<p>{report.comments}</p>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Comments</p>
									<textarea
										name="comments"
										value={newEvaluation?.evaluationContent?.comments}
										onChange={handleChange}
										className="textarea textarea-bordered w-full"
										placeholder="Enter comments regarding the report"
										required
									/>
								</div>
								<div className="my-1">
									<p className="font-bold my-1">Positive Value</p>
									<input
										type="number"
										name="pvt"
										value={newEvaluation.pvt}
										onChange={handleChange}
										min={0}
										className="input input-bordered input-sm w-full max-w-xs"
										placeholder="Positive Value"
										required
									/>
								</div>
								<div className="my-1">
									<p className="font-bold my-1">Negative Value</p>
									<input
										type="number"
										name="nvt"
										value={newEvaluation.nvt}
										onChange={handleChange}
										min={0}
										className="input input-bordered input-sm w-full max-w-xs"
										placeholder="Negative Value"
										required
									/>
								</div>
								<div className="my-2">
									<label className="form-control w-full max-w-xs">
										<div className="label">
											<span className="font-semibold label-text">
												Justifications type
											</span>
										</div>
										<select
											name="justificationType"
											onChange={handleChange}
											value={newEvaluation.justificationType}
											className="select select-bordered"
										>
											<option disabled selected>
												Pick one
											</option>
											{EvaluationCategories.map((cat, i) => (
												<option key={i} value={cat}>
													{cat}
												</option>
											))}
										</select>
									</label>
									<p className="font-bold mt-3 mb-1">
										{newEvaluation?.justificationType ?? "SDG"} Justifications
									</p>
									{newEvaluation?.evaluationContent?.planetJustifications?.map(
										(justification, index) => (
											<div key={index} className="my-2">
												<div className={"flex justify-between"}>
													{justification.planetImage !== "planetary" && (
														<img
															className="w-16 h-16"
															src={justification.planetImage}
															alt=""
														/>
													)}

													<div className="m-1 mx-2 flex-1">
														{justification.planetImage === "planetary" && (
															<p className="mb-1">
																{planetaryBoundaries[index]}
															</p>
														)}
														<textarea
															name={`planetJustifications-${index}-comment`}
															value={justification.comment}
															onChange={handleChange}
															className="textarea textarea-bordered w-full"
															placeholder="Enter justification comment"
															required
														/>
														<div>
															<input
																type="range"
																name={`planetJustifications${index}percentage`}
																value={justification.percentage}
																min={-100}
																max={100}
																step={1}
																onChange={(e) =>
																	handleSliderChange(
																		index,
																		Number(e.target.value)
																	)
																}
																className="w-full range range-primary mt-1"
															/>
															<p className="text-right">
																{justification.percentage}%
															</p>
														</div>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
							<div className="modal-footer space-x-2 text-right mt-3">
								<button
									className="btn"
									disabled={loading}
									onClick={handleClose}
								>
									Cancel
								</button>
								<button
									className="btn btn-primary"
									disabled={loading}
									onClick={handleSubmit}
								>
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

export default EvaluationDialog;
