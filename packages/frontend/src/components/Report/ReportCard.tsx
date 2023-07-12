/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Report } from "../../types/Report";
import EvaluationDialog from "../Evaluation/EvaluationDialog";
import { useContractRead } from "wagmi";
import ABI from "../../contracts/ABI";
import ADDRESS from "../../contracts/Address";
import { Organisation } from "../../types/Organisation";
const ReportCard = ({ report }: { report: Report }) => {
	const {
		organisationGUID,
		title,
		comments,
		uploadDate,
		accountingPeriodStart,
		accountingPeriodEnd,
		source,
		ipfs,
	} = report;
	const getOrganisations = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getOrganisations",
	});
	const [organisationName, setOrganisationName] = useState("");
	useEffect(() => {
		if (getOrganisations.data) {
			//@ts-ignore
			getOrganisations.data.map((org: Organisation) => {
				if (org.orgGuid === organisationGUID) {
					setOrganisationName(org.orgGuid);
				}
			});
		}
	}, [getOrganisations.data, organisationGUID]);

	return (
		<div className="card bg-base-100  my-3 border-2 shadow-xl">
			<div className="card-body">
				<h2 className="card-title text-lg font-bold mb-3">{title}</h2>
				<p className="text-gray-400 mb-2">
					{organisationName !== "" ? organisationName : "X Inc."}
				</p>
				<p className="text-gray-600 mb-2">{comments}</p>
				<p className="text-gray-600 mb-2">
					Upload Date: {uploadDate.toDateString()}
				</p>
				<p className="text-gray-600 mb-4">
					Accounting Period: {accountingPeriodStart.toDateString()} -{" "}
					{accountingPeriodEnd.toDateString()}
				</p>
				<div className="card-actions justify-end">
					<a
						href={source}
						className="btn btn-info mr-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Report
					</a>
					<a
						href={ipfs}
						className="btn btn-secondary"
						target="_blank"
						rel="noopener noreferrer"
					>
						View on IPFS
					</a>
					<EvaluationDialog report={report} />
				</div>
			</div>
		</div>
	);
};

export default ReportCard;
