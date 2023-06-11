import OrganisationDialog from "../components/Organisation/OrganisationDialog";
import { mockOrganisations } from "../mock/Organisations";

const OrganisationsPage = () => {
	return (
		<div className="p-4">
			<div className="max-w-5xl mx-auto">
				<div className="flex justify-between mb-4">
					<h1 className="text-2xl font-bold text-black/60 my-auto">
						Organisation List
					</h1>
					<OrganisationDialog />
				</div>
				<table className="min-w-full table">
					<thead>
						<tr>
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Organisation</th>
						</tr>
					</thead>
					<tbody>
						{mockOrganisations.map((organisation, index) => (
							<tr key={index} className="bg-white shadow-md hover:bg-gray-50">
								<td className="border px-4 py-2">{index + 1}</td>
								<td className="border px-4 py-2">{organisation.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrganisationsPage;
