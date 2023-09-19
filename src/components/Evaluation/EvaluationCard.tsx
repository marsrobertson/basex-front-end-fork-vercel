/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import ABI from "../../contracts/ABI";
import ADDRESS from "../../contracts/Address";
import { Evaluation } from "../../types/Evaluation";
import { Organisation } from "../../types/Organisation";
import { toDateTimeString } from '../../utils/dateUtils';


const EvaluationCard = ({ evaluation }: { evaluation: Evaluation }) => {
	const {
		organisationGUID,
		reportTitle,
		evaluationContent,
		uploadDate,
		pvt,
		nvt,
	} = evaluation;
	const getOrganisations = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getOrganisations",
	});
	const [organisation, setOrganisation] = useState<Organisation>();
	useEffect(() => {
		if (getOrganisations.data) {
			//@ts-ignore
			getOrganisations.data.map((org: Organisation, i: number) => {
				if (org.orgGuid === organisationGUID) {
					setOrganisation({ ...org, id: i });
				}
			});
		}
	}, [getOrganisations.data, organisationGUID]);

	return (
		<div className="card bg-base-100 my-3 border-2 shadow-xl">
			<div className="card-body">
				<h2 className="card-title text-lg font-bold mb-3">{reportTitle}</h2>
				{organisation?.name && (
					<section>
						<h3 className="text-base font-bold mb-2">Organisation</h3>
						<p className="text-gray-600">
							{organisation?.name !== "" ? organisation?.name : "X Inc."}
						</p>
					</section>
				)}
				<section>
					<h3 className="text-base font-bold mb-2">Comments</h3>
					<p className="text-gray-600">
						{evaluationContent?.comments ?? "None"}
					</p>
				</section>
				{pvt && nvt && (
					<section>
						<h3 className="text-base font-bold mb-1">Positive Value</h3>
						<p className="text-gray-600">{pvt}</p>
						<h3 className="text-base font-bold mb-1">Negative Value</h3>
						<p className="text-gray-600">{nvt}</p>
					</section>
				)}
				{evaluationContent?.planetJustifications && (
					<section>
						<h3 className="text-base font-bold mb-2">Planet Justifications</h3>
						{evaluationContent?.planetJustifications?.map(
							(justification, index) => (
								<div key={index} className="flex items-center mb-4">
									<div className="w-10 h-10 mr-4">
										<img
											src={justification.planetImage}
											alt="Planet Justification"
											className="object-cover w-full h-full"
										/>
									</div>
									<div>
										<p className="text-gray-600">{justification.comment}</p>
										<p className="text-gray-600">
											Percentage: {justification.percentage}%
										</p>
									</div>
								</div>
							)
						)}
					</section>
				)}
				{/* <section>
					<h3 className="text-base font-bold mb-2">Author</h3>
					<p className="text-gray-600">{author}</p>
				</section> */}
				<section>
					<h3 className="text-base font-bold mb-2">Upload Date</h3>
					<p className="text-gray-600">
						{toDateTimeString (new Date(uploadDate ? uploadDate.toString() : "") )}
					</p>
				</section>
				{/* <div className="card-actions justify-end">
					<button className="btn btn-primary">View Evaluation</button>
				</div> */}
			</div>
		</div>
	);
};

export default EvaluationCard;
