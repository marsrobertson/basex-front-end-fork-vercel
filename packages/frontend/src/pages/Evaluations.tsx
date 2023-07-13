/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { Evaluation } from "../types/Evaluation";
import EvaluationCard from "../components/Evaluation/EvaluationCard";
/* import { mockEvaluations } from "../mock/Evalutions"; */

const EvaluationsPage = () => {
	//@ts-ignore
	const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

	/* useEffect(() => {
		setTimeout(() => {
			setEvaluations(mockEvaluations);
		}, 300);
	}, []); */

	return (
		<div className="m-3">
			<h2 className="my-2 text-4xl text-black/60">Evaluations</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-content-center">
				{evaluations.map((evaluation, i) => (
					<EvaluationCard evaluation={evaluation} key={i} />
				))}
			</div>
		</div>
	);
};

export default EvaluationsPage;
