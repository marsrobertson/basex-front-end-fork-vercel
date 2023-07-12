export interface Report {
	organisationGUID: string;
	title: string;
	comments: string;
	uploadDate: Date;
	accountingPeriodStart: Date;
	accountingPeriodEnd: Date;
	source: string;
	ipfs: string;
	reportGUID: string;
}
