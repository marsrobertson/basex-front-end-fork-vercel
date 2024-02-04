export interface Justification {
	comment: string;
	percentage: number;
	imageURL?: string;
	title?: string;
}

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
	co2?: number;
	h2o?: number;
	GUID?: string;
	evaluationContent?: {
		comments: string;
		/* planetJustifications?: Array<{
			comment: string;
			percentage: number;
			planetImage?: string;
			planetaryBoundary?: string;
		}>; */
		justifications?: {
			[key: string]: Array<Justification>;
		};
	};
	author?: string;
	date?: Date;
}
