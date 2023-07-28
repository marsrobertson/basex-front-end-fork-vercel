export interface Evaluation {
	organisationGUID: string;
	targetGUID: string;
	title?: string;
	reportTitle?: string;
	uploadDate?: Date;
	accountingPeriodStart?: Date;
	accountingPeriodEnd?: Date;
	pvt?: number;
	nvt?: number;
	evaluationContent?: {
		comments: string;
		planetJustifications?: Array<{
			comment: string;
			percentage: number;
			planetImage?: string;
		}>;
	};
	author?: string;
	date?: Date;
}
