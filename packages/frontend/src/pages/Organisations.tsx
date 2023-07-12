/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContractRead } from "wagmi";
import OrganisationDialog from "../components/Organisation/OrganisationDialog";
import ABI from "../contracts/ABI";
import ADDRESS from "../contracts/Address";
import Spinner from "../utils/Spinner";
import { Organisation } from "../types/Organisation";
const OrganisationsPage = () => {
	const { data, isError, isLoading } = useContractRead({
		address: ADDRESS,
		abi: ABI,
		functionName: "getOrganisations",
	});

	if (isLoading) {
		return (
			<div className="p-4 my-auto flex gap-2 justify-center text-center">
				<Spinner color="info" />
				<p className="my-auto text-ßxl">Loading Organisations</p>
			</div>
		);
	}
	if (isError) {
		return (
			<div className="p-4">
				<div className="alert alert-error">
					<div className="justify-between flex w-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="stroke-current shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span>Couldn't load organisations</span>
					</div>
				</div>
			</div>
		);
	}
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
						{//@ts-ignore
						(data ?? []).map((org: Organisation, i: number) => {
							console.log(org);
							return (
								<tr key={i} className="bg-white shadow-md hover:bg-gray-50">
									<td className="border px-4 py-2">{i + 1}</td>
									<td className="border px-4 py-2">{org.name}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrganisationsPage;
