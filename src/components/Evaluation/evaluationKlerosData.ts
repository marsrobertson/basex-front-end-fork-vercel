import dayjs from "dayjs";
import { Evaluation, Justification } from "../../types/Evaluation";

export const evaluationKlerosData = (evaluation: Evaluation) => {
	const justifications: { [key: string]: Array<Justification> } =
		evaluation.evaluationContent?.justifications || {};

	const descriptionData: { [key: string]: string | number } = {
		Title: evaluation.title ?? "",
		"Start Date": dayjs(evaluation.accountingPeriodStart).toISOString(),
		"End Date": dayjs(evaluation.accountingPeriodEnd).toISOString(),
		"Upload Date": dayjs().toISOString(),
		comments: evaluation.evaluationContent?.comments ?? "",
		GUID: evaluation.GUID ?? "",
		"GUID Target": evaluation.targetGUID,
		"Positive Value": evaluation.pvt ?? 0,
		"Negative Value": evaluation.nvt ?? 0,
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
