import dayjs from "dayjs";
import { Evaluation, Justification } from "../../types/Evaluation";

export const evaluationKlerosData = (evaluation: Evaluation) => {
	const justifications: { [key: string]: Array<Justification> } =
		evaluation.evaluationContent?.justifications || {};

	const descriptionData: { [key: string]: string | number } = {
		title: evaluation.title ?? "",
		startDate: dayjs(evaluation.accountingPeriodStart).toISOString(),
		endDate: dayjs(evaluation.accountingPeriodEnd).toISOString(),
		comments: evaluation.evaluationContent?.comments ?? "",
		guid: evaluation.GUID ?? "",
		guidTarget: evaluation.targetGUID,
		positiveValue: evaluation.pvt ?? 0,
		negativeValue: evaluation.nvt ?? 0,
	};

	Object.keys(justifications).forEach((category) => {
		const justificationArray = justifications[category];

		justificationArray.forEach((justification, index) => {
			// Add the description object for the "Value"
			descriptionData[`${category}${index + 1} Value`] =
				justification.percentage;

			// Add the description object for the "Comment"
			descriptionData[`${category}${index + 1} Comment`] =
				justification.comment;
		});
	});

	return descriptionData;
};
