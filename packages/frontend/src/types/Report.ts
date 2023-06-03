export interface Report {
	organization: string;
	title: string;
	comments: string;
	uploadDate: Date;
	accountingPeriodStart: Date;
	accountingPeriodEnd: Date;
	source: string;
	ipfs: string;
}
