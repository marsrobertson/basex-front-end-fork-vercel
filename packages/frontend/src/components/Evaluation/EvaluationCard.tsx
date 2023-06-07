import { Evaluation } from "../../types/Evaluation";

const EvaluationCard = ({ evaluation }: { evaluation: Evaluation }) => {
	const {
		organisation,
		reportTitle,
		evaluationContent,
		author,
		date,
	} = evaluation;

	return (
		<div className="card bg-base-100 my-3 border-2 shadow-xl">
			<div className="card-body">
				<h2 className="card-title text-lg font-bold mb-3">{reportTitle}</h2>
				<section>
					<h3 className="text-base font-bold mb-2">Organization</h3>
					<p className="text-gray-600">{organisation}</p>
				</section>
				<section>
					<h3 className="text-base font-bold mb-2">Comments</h3>
					<p className="text-gray-600">{evaluationContent.comments}</p>
				</section>
				<section className="border p-2 my-2">
					<div className="grid grid-cols-2">
						<h3 className="text-base font-bold mb-2">People</h3>
						<p className="text-gray-600 ml-auto text-xl font-semibold">
							{evaluationContent.people.amount} $
						</p>
					</div>
					<p className="text-gray-600">{evaluationContent.people.comment}</p>
				</section>
				<section className="border p-2 my-2">
					<div className="grid grid-cols-2 gap-4">
						<h3 className="text-base font-bold mb-2">Planet</h3>
						<p className="text-gray-600 ml-auto text-xl font-semibold">
							{evaluationContent.planet.amount} $
						</p>
					</div>
					<p className="text-gray-600">{evaluationContent.planet.comment}</p>
				</section>
				<section className="border p-2 my-2">
					<div className="grid grid-cols-2 gap-4">
						<h3 className="text-base font-bold mb-2">Profit</h3>
						<p className="text-gray-600 ml-auto text-xl font-semibold">
							{evaluationContent.profit.amount} $
						</p>
					</div>
					<p className="text-gray-600">{evaluationContent.profit.comment}</p>
				</section>
				<section>
					<h3 className="text-base font-bold mb-2">Planet Justifications</h3>
					{evaluationContent.planetJustifications.map(
						(justification, index) => (
							<div key={index} className="flex items-center mb-4">
								<div className="w-10 h-10 mr-4">
									<img
										src={justification.planetImage}
										alt="Planet Justification"
										className="object-cover w-full h-full"
									/>
								</div>
								<div>
									<p className="text-gray-600">{justification.comment}</p>
									<p className="text-gray-600">
										Percentage: {justification.percentage}%
									</p>
								</div>
							</div>
						)
					)}
				</section>
				<section>
					<h3 className="text-base font-bold mb-2">Author</h3>
					<p className="text-gray-600">{author}</p>
				</section>
				<section>
					<h3 className="text-base font-bold mb-2">Date</h3>
					<p className="text-gray-600">{date.toDateString()}</p>
				</section>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">View Evaluation</button>
				</div>
			</div>
		</div>
	);
};

export default EvaluationCard;
