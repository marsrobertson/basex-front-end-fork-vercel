export interface Evaluation {
	organisationGUID: string;
	reportTitle: string;
	evaluationContent: {
		comments: string;
		planetJustifications: Array<{
			comment: string;
			percentage: number;
			planetImage: string;
		}>;
	};
	author: string;
	date: Date;
}
