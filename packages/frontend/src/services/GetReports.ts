import { Report } from "../types/Report";

export const fetchReports = async (data: any): Promise<Report[]> => {
	const reports: Report[] = [];

	for (const contractReport of data) {
		const ipfsHash = contractReport.JSONIPFS.replace("/ipfs/", "");
		const response = await fetch(`https://ipfs.io/ipfs/${ipfsHash}`);
		const { values: reportData } = await response.json();

		const report: Report = {
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

		reports.push(report);
		console.log(report);
	}

	console.log(reports);
	return reports;
};
