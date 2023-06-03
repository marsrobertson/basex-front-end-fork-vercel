import { useState, useEffect } from "react";
import { Report } from "../types/Report";
import mockReports from "../mock/Reports";
import ReportCard from "../components/Report/ReportCard";

const ReportsPage = () => {
	const [reports, setReports] = useState<Report[]>([]);

	useEffect(() => {
		(async () => {
			setTimeout(() => {
				setReports(mockReports);
			}, 300);
		})();
	}, []);
	return (
		<div className="m-3">
			<div className="flex justify-between">
				<h2 className="my-2 text-4xl">List of reports</h2>
				<button className="btn btn-outline btn-primary my-2">New Report</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
				{reports.map((report, i) => (
					<ReportCard report={report} key={i} />
				))}
				d
			</div>
		</div>
	);
};

export default ReportsPage;
