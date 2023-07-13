/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { Report } from "../types/Report";
import ReportCard from "../components/Report/ReportCard";
import ReportDialog from "../components/Report/ReportDialog";
import { useContractRead } from "wagmi";
import ABI from "../contracts/ABI";
import ADDRESS from "../contracts/Address";
import Spinner from "../utils/Spinner";
import isGuidInLocalStorage from "../utils/guidInLocalStorage";

const ReportsPage = () => {
	const [reports, setReports] = useState<Report[]>([]);
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
				console.log(data);
				//@ts-ignore
				await data.map((contractReport: any) => {
					// grab the report IPFS data using the hash from contractReport.JSONIPFS and log it
					// JSONIPFS param looks like /ipfs/XYZ
					const ipfsHash = contractReport.JSONIPFS.replace("/ipfs/", "");
					fetch(`https://ipfs.io/ipfs/${ipfsHash}`).then((r) => {
						r.json().then((response) => {
							const { values: reportData } = response;

							setReports((prevReports) => {
								const newReport = {
									organisationGUID: contractReport.targetGuid,
									title: `${reportData.Title}`,
									comments: reportData.Comments,
									uploadDate: new Date(reportData["Start Date"]),
									accountingPeriodStart: new Date(reportData["Start Date"]),
									accountingPeriodEnd: new Date(reportData["End Date"]),
									source: reportData.Source,
									ipfs: reportData.IPFS,
									reportGUID: contractReport.itemGuid,
								};
								// Filter out duplicates based on reportGUID
								const filteredReports = prevReports.filter(
									(report) => report.reportGUID !== newReport.reportGUID
								);

								// Add the new report to the filtered array
								if (isGuidInLocalStorage(contractReport.targetGuid))
									return [...filteredReports, newReport];
								return filteredReports;
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
				<p className="my-auto text-ßxl">Loading Reports</p>
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
						<span>Couldn't load reports</span>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="m-3">
			<div className="flex justify-between">
				<h2 className="my-2 text-4xl">List of reports</h2>
				<ReportDialog />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
				{reports.map((report, i) => (
					<ReportCard report={report} key={i} />
				))}
			</div>
		</div>
	);
};

export default ReportsPage;
