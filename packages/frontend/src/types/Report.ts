export interface Report {
	organisation: string;
	title: string;
	comments: string;
	uploadDate: Date;
	accountingPeriodStart: Date;
	accountingPeriodEnd: Date;
	source: string;
	ipfs: string;
	reportGUID: string;
}
