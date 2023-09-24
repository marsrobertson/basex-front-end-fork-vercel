export interface Evaluation {
	organisationGUID: string;
	targetGUID: string;
	title?: string;
	uploadDate?: Date;
	accountingPeriodStart?: Date;
	accountingPeriodEnd?: Date;
	pvt?: number;
	nvt?: number;
	GUID?: string;
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
