/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useContractRead } from "wagmi";
import OrganisationDialog from "../components/Organisation/OrganisationDialog";
import ABI_prod from "../contracts/ABI_prod";
import ADDRESS_prod from "../contracts/Address_prod";
import ABI_staging from "../contracts/ABI_staging";
import ADDRESS_staging from "../contracts/Address_staging";

import Spinner from "../utils/Spinner";
import { Organisation } from "../types/Organisation";
import { reloadOrganisations } from "../atoms/reloadTriggers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

import CleanupService from "../services/CleanupService";

const STAGING = import.meta.env.VITE_STAGING
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const OrganisationsPage = () => {
    const [hasToReloadOrganisations, setReloadOrganisations]= useAtom(reloadOrganisations);
	const { data, isError, isLoading,refetch } = useContractRead({
		address: ADDRESS,
        abi: ABI,
		functionName: "getOrganisations",
	});

	const [filteredData, setFilteredData] = useState<Organisation[]>([]);
	useEffect(() => {
		if (data) {
			let newData = CleanupService.removeOrganisationGUIDs(data as Organisation[]);
			setFilteredData(newData)
		}
	}, [data]);

    useEffect(() => {
        if (hasToReloadOrganisations) {
            refetch();
            setReloadOrganisations(false);
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasToReloadOrganisations])
    
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

						(filteredData ?? []).map((org: Organisation, i: number) => {
							// console.log(org);
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
