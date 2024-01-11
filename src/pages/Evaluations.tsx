/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Evaluation } from "../types/Evaluation";
import EvaluationCard from "../components/Evaluation/EvaluationCard";
import { useContractRead } from "wagmi";
import ABI_prod from "../contracts/ABI_prod";
import ADDRESS_prod from "../contracts/Address_prod";
import ABI_staging from "../contracts/ABI_staging";
import ADDRESS_staging from "../contracts/Address_staging";
import Spinner from "../utils/Spinner";
import isGuidInLocalStorage from "../utils/guidInLocalStorage";
import { EvaluationCategories } from "../utils/categoriesEval";
/* import { mockEvaluations } from "../mock/Evalutions"; */

const STAGING = import.meta.env.VITE_STAGING;
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const EvaluationsPage = () => {
	//@ts-ignore
	const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("SDG");
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
		if (selectedCategory) loadBEEvaluations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategory]);

	const loadBEEvaluations = async () => {
		const SUFFIX = import.meta.env.VITE_STAGING ? "_staging" : ""; // Mars HACK to use staging data (temporary solutions that stay forever)
		const evalsData = await fetch(
			`${import.meta.env.VITE_BACKEND_ENDPOINT}/evaluations${SUFFIX}${
				selectedCategory
					? `/${
							selectedCategory === "Planetary Boundaries"
								? "planetary"
								: selectedCategory
					  }`
					: ""
			}`
		);
		const beEvaluations: Evaluation[] = await evalsData.json();

		/* // HACK FIX CHANGING IMAGE
		for (let i = 0; i < beEvaluations.length; i++) {
			const justifications =
				beEvaluations[i].evaluationContent?.planetJustifications;
			if (justifications) {
				for (let j = 0; j < justifications.length; j++) {
                    const justification = justifications[j];
                    
					if (
						justification.planetImage &&
						justification.planetImage.includes("/img/sdg")
					) {
						justification.planetImage = justification.planetImage
							.replace("/img/sdg", "/img/ebfs/ebf-")
							.replace(".png", ".svg");
					}
				}
			}
		} */

		// HACK FIX REMOVE THE GUIDS THAT DO NOT HAVE CORRECT IMAGES
		const toBeRemoved = [
			"95fe865c-5096-4c6e-a1c3-ad289013d1ce",
			"838765c7-2ca1-487d-bfef-4ff385fc0f66",
			"42d56b09-03ae-49d1-bf75-9ef4d91adf2b",
			"a5b58c94-bfd5-4e44-a0dc-b3b622e06962",
			"a2237bcf-6003-44b7-aca0-0fb9380b0b6c",
		];
		const filteredArray = beEvaluations.filter(
			(item) => !toBeRemoved.includes(item.GUID!)
		);

		setEvaluations(filteredArray);
	};
	useEffect(() => {
		(async () => {
			setLoading(true);
			if (import.meta.env.VITE_BACKEND_ENDPOINT) await loadBEEvaluations();
			else {
				if (data) {
					// console.log(data);
					//@ts-ignore
					await data.map((contractEvaluation: any) => {
						// grab the report IPFS data using the hash from contractReport.JSONIPFS and log it
						// JSONIPFS param looks like /ipfs/XYZ
						const ipfsHash = contractEvaluation.JSONIPFS.replace("/ipfs/", "");
						fetch(`https://ipfs.kleros.io/ipfs/${ipfsHash}`).then((r) => {
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
										uploadDate: new Date(
											evalData["Upload Date"] ?? evalData["Start Date"]
										),
										accountingPeriodStart: new Date(evalData["Start Date"]),
										accountingPeriodEnd: new Date(evalData["End Date"]),
										targetGUID: contractEvaluation.targetGuid,
									};

									for (let i = 1; i <= 6; i++) {
										const sdgValueKey = `SDG${i} Value`;
										const sdgCommentKey = `SDG${i} Comment`;

										if (evalData[sdgValueKey] || evalData[sdgCommentKey]) {
											//@ts-ignore
											newEvaluation.evaluationContent.planetJustifications.push(
												{
													comment: evalData[sdgCommentKey],
													percentage: parseFloat(evalData[sdgValueKey]),
													planetImage: `/img/ebfs/ebf-${i}.svg`,
												}
											);
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
			}
			setLoading(false);
		})();
	}, [data]);

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
			<div
				role="tablist"
				className="tabs tabs-boxed mx-auto w-fit border-primary/40 rounded-md border-2 justify-center bg-transparent"
			>
				{EvaluationCategories.map((category, i) => (
					<a
						key={i}
						role="tab"
						className={` tab ${
							category === selectedCategory ? "tab-active" : ""
						} `}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</a>
				))}
			</div>
			<div className="grid tab-content  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
				{evaluations.map((evaluation, i) => (
					<EvaluationCard evaluation={evaluation} key={i} />
				))}
			</div>
		</div>
	);
};

export default EvaluationsPage;
