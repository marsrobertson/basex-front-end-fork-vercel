export interface Evaluation {
	organisation: string;
	reportTitle: string;
	evaluationContent: {
		comments: string;
		people: {
			amount: number;
			comment: string;
		};
		planet: { amount: number; comment: string };
		profit: { amount: number; comment: string };
		planetJustifications: Array<{
			comment: string;
			percentage: number;
			planetImage: string;
		}>;
	};
	author: string;
	date: Date;
}
