/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Evaluation } from "../types/Evaluation";
import EvaluationCard from "../components/Evaluation/EvaluationCard";
import { useContractRead } from "wagmi";
import ABI from "../contracts/ABI";
import ADDRESS from "../contracts/Address";
import Spinner from "../utils/Spinner";
import isGuidInLocalStorage from "../utils/guidInLocalStorage";
/* import { mockEvaluations } from "../mock/Evalutions"; */

const EvaluationsPage = () => {
	//@ts-ignore
	const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
	const [loading, setLoading] = useState(false);
	const { data, isError, isLoading } = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getItems",
		/* select: async (data) => {
			//@ts-ignore
			const results = await data.map(async (contractReport: any, i: number) => {
				// grab the report IPFS data using the hash from contractReport.JSONIPFS and log it
				// JSONIPFS param looks like /ipfs/XYZ
				const ipfsHash = contractReport.JSONIPFS.replace("/ipfs/", "");
				const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
				const { values: reportData } = await response.json();

				return {
					organisationGUID: contractReport.targetGuid,
					title: reportData.Title,
					comments: reportData.Comments,
					uploadDate: reportData["Start Date"],
					accountingPeriodStart: reportData["End Date"],
					accountingPeriodEnd: reportData["Start Date"],
					source: reportData.Source,
					ipfs: reportData.IPFS,
					reportGUID: contractReport.itemGuid,
				};
			});
			return await results;
		}, */
	});
	useEffect(() => {
		(async () => {
			setLoading(true);
			if (data) {
				// console.log(data);
				//@ts-ignore
				await data.map((contractEvaluation: any) => {
					// grab the report IPFS data using the hash from contractReport.JSONIPFS and log it
					// JSONIPFS param looks like /ipfs/XYZ
					const ipfsHash = contractEvaluation.JSONIPFS.replace("/ipfs/", "");
					fetch(`https://ipfs.io/ipfs/${ipfsHash}`).then((r) => {
						r.json().then((response) => {
							const { values: evalData } = response;
							console.log(evalData);
							setEvaluations((prevEvaluations) => {
								if (isGuidInLocalStorage(contractEvaluation.targetGuid)) {
									return prevEvaluations;
								}
								const newEvaluation: Evaluation = {
									organisationGUID: "",
									GUID: `${evalData.GUID}`,
									title: `${evalData.Title}`,
									evaluationContent: {
										comments: evalData.Comments,
										planetJustifications: [],
									},
									pvt: Number(evalData["Positive Value"] ?? 0),
									nvt: Number(evalData["Negative Value"] ?? 0),
									uploadDate: new Date(evalData["Start Date"]),
									accountingPeriodStart: new Date(evalData["Start Date"]),
									accountingPeriodEnd: new Date(evalData["End Date"]),
									targetGUID: contractEvaluation.targetGuid,
								};

								for (let i = 1; i <= 17; i++) {
									const sdgValueKey = `SDG${i} Value`;
									const sdgCommentKey = `SDG${i} Comment`;

									if (evalData[sdgValueKey] || evalData[sdgCommentKey]) {
										//@ts-ignore
										newEvaluation.evaluationContent.planetJustifications.push({
											comment: evalData[sdgCommentKey],
											percentage: parseFloat(evalData[sdgValueKey]),
											planetImage: `/img/sdg${i}.png`,
										});
									}
								}
								// Filter out duplicates based on reportGUID
								const filteredEvaluations = prevEvaluations.filter(
									(evaluation) => evaluation.GUID !== newEvaluation.GUID
								);
								// console.log(newEvaluation);
								// Add the new report to the filtered array
								if (!isGuidInLocalStorage(contractEvaluation.targetGuid))
									return [...filteredEvaluations, newEvaluation];
								return filteredEvaluations;
							});
						});
					});
				});
			}
			setLoading(false);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading || loading) {
		return (
			<div className="p-4 my-auto flex gap-2 justify-center text-center">
				<Spinner color="info" />
				<p className="my-auto text-ßxl">Loading Evaluations</p>
			</div>
		);
	}
	if (isError) {
		return (
			<div className="p-4">
				<div className="alert alert-error">
					<div className="justify-between flex w-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Couldn't load evaluations</span>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="m-3">
			<h2 className="my-2 text-4xl text-black/60">Evaluations</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
				{evaluations.map((evaluation, i) => (
					<EvaluationCard evaluation={evaluation} key={i} />
				))}
			</div>
		</div>
	);
};

export default EvaluationsPage;
