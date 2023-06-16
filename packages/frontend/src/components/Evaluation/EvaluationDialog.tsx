import React, { useState } from "react";
import { Evaluation } from "../../types/Evaluation";
import { Report } from "../../types/Report";

const EvaluationDialog = ({ report }: { report: Report }) => {
	const [open, setOpen] = useState(false);
	const [newEvaluation, setNewEvaluation] = useState<Evaluation>({
		organisation: report.organisation,
		reportTitle: report.title,
		evaluationContent: {
			comments: "",
			people: { amount: 0, comment: "" },
			planet: { amount: 0, comment: "" },
			profit: { amount: 0, comment: "" },
			planetJustifications: Array.from({ length: 17 }, (_, index) => ({
				comment: "",
				percentage: 0,
				planetImage: `/img/sdg${index + 1}.png`,
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
			organisation: "",
			reportTitle: "",
			evaluationContent: {
				comments: "",
				people: { amount: 0, comment: "" },
				planet: { amount: 0, comment: "" },
				profit: { amount: 0, comment: "" },
				planetJustifications: [],
			},
			author: "",
			date: new Date(),
		});
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;

		if (
			name === "peopleAmount" ||
			name === "planetAmount" ||
			name === "profitAmount"
		) {
			// Handle changes in the amount fields
			const field = name.split("Amount")[0].toLowerCase();
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				evaluationContent: {
					...prevEvaluation.evaluationContent,
					[field]: {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						...prevEvaluation.evaluationContent[field],
						amount: Number(value),
					},
				},
			}));
		} else if (
			name === "peopleComment" ||
			name === "planetComment" ||
			name === "profitComment"
		) {
			// Handle changes in the comment fields
			const field = name.split("Comment")[0].toLowerCase();
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				evaluationContent: {
					...prevEvaluation.evaluationContent,
					[field]: {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						//@ts-ignore
						...prevEvaluation.evaluationContent[field],
						comment: value,
					},
				},
			}));
		} else if (name.includes("planetJustifications")) {
			// Handle changes in the planetJustifications fields
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const [_fieldName, indexString, fieldType] = name.split("-");
			const index = Number(indexString);
			const field = fieldType === "comment" ? "comment" : "percentage";
			const updatedPlanetJustifications = [
				...newEvaluation.evaluationContent.planetJustifications,
			];
			updatedPlanetJustifications[index] = {
				...updatedPlanetJustifications[index],
				[field]: value,
			};
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				evaluationContent: {
					...prevEvaluation.evaluationContent,
					planetJustifications: updatedPlanetJustifications,
				},
			}));
		} else {
			// Handle changes in other fields
			setNewEvaluation((prevEvaluation) => ({
				...prevEvaluation,
				[name]: value,
			}));
		}
	};

	const handleSliderChange = (index: number, value: number) => {
		const updatedPlanetJustifications = [
			...newEvaluation.evaluationContent.planetJustifications,
		];
		updatedPlanetJustifications[index] = {
			...updatedPlanetJustifications[index],
			percentage: value,
		};
		setNewEvaluation((prevEvaluation) => ({
			...prevEvaluation,
			evaluationContent: {
				...prevEvaluation.evaluationContent,
				planetJustifications: updatedPlanetJustifications,
			},
		}));
	};

	const handleSubmit = () => {
		// Perform any additional validation or processing here

		handleClose();
	};

	return (
		<>
			<button className="btn btn-primary" onClick={handleOpen}>
				Evaluate
			</button>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center z-10">
					<div className="modal modal-open">
						<div className="modal-box">
							<button
								onClick={handleClose}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								✕
							</button>
							<h2 className="text-2xl font-bold">{report.organisation}</h2>
							<div className="modal-body">
								<div className="mb-4 text-black/60">
									<h4 className="text-lg">{report.title}</h4>
									<p>{report.comments}</p>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">People</p>
									<label className="input-group my-2">
										<span>$</span>
										<input
											type="number"
											name="peopleAmount"
											value={newEvaluation.evaluationContent.people.amount}
											onChange={handleChange}
											className="input input-bordered w-full"
											placeholder="Enter
										people amount"
											required
										/>
									</label>
									<textarea
										name="peopleComment"
										value={newEvaluation.evaluationContent.people.comment}
										onChange={handleChange}
										className="textarea textarea-bordered w-full"
										placeholder="Enter people comment"
										required
									/>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Planet</p>
									<label className="input-group my-2">
										<span>$</span>
										<input
											type="number"
											name="planetAmount"
											value={newEvaluation.evaluationContent.planet.amount}
											onChange={handleChange}
											className="input input-bordered w-full"
											placeholder="Enter planet amount"
											required
										/>
									</label>
									<textarea
										name="planetComment"
										value={newEvaluation.evaluationContent.planet.comment}
										onChange={handleChange}
										className="textarea textarea-bordered w-full"
										placeholder="Enter planet comment"
										required
									/>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Profit</p>
									<label className="input-group my-2">
										<span>$</span>
										<input
											type="number"
											name="profitAmount"
											value={newEvaluation.evaluationContent.profit.amount}
											onChange={handleChange}
											className="input input-bordered w-full"
											placeholder="Enter profit amount"
											required
										/>
									</label>
									<textarea
										name="profitComment"
										value={newEvaluation.evaluationContent.profit.comment}
										onChange={handleChange}
										className="textarea textarea-bordered w-full"
										placeholder="Enter profit comment"
										required
									/>
								</div>
								<div className="my-2">
									<p className="font-bold my-1">Planet Justifications</p>
									{newEvaluation.evaluationContent.planetJustifications.map(
										(justification, index) => (
											<div key={index} className="my-2">
												<div className="flex justify-between">
													<img src={justification.planetImage} alt="" />
													<div className="m-1 mx-2 flex-1">
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
																className="w-full range range-primary"
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

export default EvaluationDialog;
