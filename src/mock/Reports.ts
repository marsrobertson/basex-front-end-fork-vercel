import { Report } from "../types/Report";
import GUIDService from "../services/GUIDService";
const mockReports: Report[] = [
	{
		organisationGUID: GUIDService.createGUID(),
		reportGUID: GUIDService.createGUID(),
		title: "Financial Report",
		comments: "This is the financial report for the current year.",
		uploadDate: new Date("2023-05-15"),
		accountingPeriodStart: new Date("2023-01-01"),
		accountingPeriodEnd: new Date("2023-12-31"),
		source: "https://example.com/reports/financial-report.pdf",
		ipfs: "https://ipfs.io/ipfs/QmW7Gb3Aie9RtK3bqW4X8tzFrE2HZVeJ13tB8jEn2D5ty9",
	},
	{
		organisationGUID: GUIDService.createGUID(),
		reportGUID: GUIDService.createGUID(),
		title: "Annual Report",
		comments: "Please review the annual report for important information.",
		uploadDate: new Date("2023-04-20"),
		accountingPeriodStart: new Date("2022-01-01"),
		accountingPeriodEnd: new Date("2022-12-31"),
		source: "https://example.com/reports/annual-report.pdf",
		ipfs: "https://ipfs.io/ipfs/QmY9Dm2Rf12CjX8tA2Wh6jEnZb8K3GqW7HzVeFrt9t5yE",
	},
	{
		organisationGUID: GUIDService.createGUID(),
		reportGUID: GUIDService.createGUID(),
		title: "Quarterly Report",
		comments: "Check out the quarterly report for detailed analysis.",
		uploadDate: new Date("2023-03-10"),
		accountingPeriodStart: new Date("2023-01-01"),
		accountingPeriodEnd: new Date("2023-03-31"),
		source: "https://example.com/reports/quarterly-report.pdf",
		ipfs: "https://ipfs.io/ipfs/QmZ8Dk6Gf24TnV7tY3RtH7DnQb1En5Fy2Zb8CjXm9Hq4As",
	},
	{
		organisationGUID: GUIDService.createGUID(),
		reportGUID: GUIDService.createGUID(),
		title: "Year-End Financial Statement",
		comments:
			"Review the year-end financial statement for performance evaluation.",
		uploadDate: new Date("2023-01-05"),
		accountingPeriodStart: new Date("2022-01-01"),
		accountingPeriodEnd: new Date("2022-12-31"),
		source: "https://example.com/reports/year-end-financial-statement.pdf",
		ipfs: "https://ipfs.io/ipfs/QmX9FrE2GtB7Hb8Rf13CjX8tA2Zb6DnQk3Y7VeJ2Hq5Tn",
	},
	{
		organisationGUID: GUIDService.createGUID(),
		reportGUID: GUIDService.createGUID(),
		title: "Monthly Sales Report",
		comments:
			"Analyze the monthly sales report for sales performance insights.",
		uploadDate: new Date("2023-02-15"),
		accountingPeriodStart: new Date("2023-02-01"),
		accountingPeriodEnd: new Date("2023-02-28"),
		source: "https://example.com/reports/monthly-sales-report.pdf",
		ipfs: "https://ipfs.io/ipfs/QmT8EnZa3RtH7Dk5Xm9B8Jq4As6Fy1CjV7GtZb2HnQk6Dn",
	},
];
export default mockReports;
