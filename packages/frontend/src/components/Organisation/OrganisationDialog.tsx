/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import { Organisation } from "../../types/Organisation";
import { useOnClickOutside } from "usehooks-ts";
import {
	CreateOrgJSON,
	RemoveOrgJSON,
	AddOrgToKlerosJSON,
} from "../../services/DataScructures";
import { useContractWrite } from "wagmi";
import KlerosIPFSService from "../../services/IPFSService";
import ABI from "../../contracts/ABI";
import ADDRESS from "../../contracts/Address";
import { useTransactor } from "../../hooks/useTransactor";
import GUIDService from "../../services/GUIDService";
import { parseEther } from "viem";
import getLatestOrganisation from "../../contracts/utils/getLatestOrganisation";

const OrganisationDialog = () => {
	const [open, setOpen] = useState(false);
	const writeTx = useTransactor();
	const [loading, setLoading] = useState(false);
	//@ts-ignore
	const contractAddOrgToList = useContractWrite({
		address: ADDRESS,
		abi: ABI,
		functionName: "addOrganisationToTheList",
	});
	//@ts-ignore
	const contractDeployOrg = useContractWrite({
		address: ADDRESS,
		abi: ABI,
		functionName: "deployOrganisation",
	});

	const ref = useRef(null);

	const [newOrganisation, setNewOrganisation] = useState<Organisation>({
		name: "",
	});

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setNewOrganisation({
			name: "",
		});
	};
	useOnClickOutside(ref, () => {
		handleClose();
	});
	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setNewOrganisation((prevOrganisation) => ({
			...prevOrganisation,
			[name]: value,
		}));
	};

	const handleSubmit = async () => {
		try {
			setLoading(true);
			//@ts-ignore
			const createOrgJSONCopy = JSON.parse(JSON.stringify(CreateOrgJSON)); // THINK: unsure if needed, erring on the side of caution

			createOrgJSONCopy.title = createOrgJSONCopy.title.replace(
				"___NAME___",
				newOrganisation.name
			);
			createOrgJSONCopy.description = createOrgJSONCopy.description.replace(
				"___NAME___",
				newOrganisation.name
			);
			createOrgJSONCopy.metadata.tcrTitle = createOrgJSONCopy.metadata.tcrTitle.replace(
				"___NAME___",
				newOrganisation.name
			);
			createOrgJSONCopy.metadata.tcrDescription = createOrgJSONCopy.metadata.tcrDescription.replace(
				"___NAME___",
				newOrganisation.name
			);

			// STEP 1A: upload createOrgJSONCopy to IPFS
			const registstrationResponse = await KlerosIPFSService.publishToKlerosNode(
				"item.json",
				new TextEncoder().encode(createOrgJSONCopy)
			);
			//@ts-ignore
			const removeOrgJSONCopy = JSON.parse(JSON.stringify(RemoveOrgJSON));
			removeOrgJSONCopy.title = removeOrgJSONCopy.title.replace(
				"___NAME___",
				newOrganisation.name
			);
			removeOrgJSONCopy.description = removeOrgJSONCopy.description.replace(
				"___NAME___",
				newOrganisation.name
			);
			removeOrgJSONCopy.metadata.tcrTitle = removeOrgJSONCopy.metadata.tcrTitle.replace(
				"___NAME___",
				newOrganisation.name
			);
			removeOrgJSONCopy.metadata.tcrDescription = removeOrgJSONCopy.metadata.tcrDescription.replace(
				"___NAME___",
				newOrganisation.name
			);

			// STEP 1B: upload removeOrgJSONCopy to IPFS
			const removeResponse = await KlerosIPFSService.publishToKlerosNode(
				"item.json",
				new TextEncoder().encode(removeOrgJSONCopy)
			);
			//@ts-ignore
			console.log(removeResponse[0].hash);

			const deployParams = {
				orgGuid: GUIDService.createGUID(),
				name: newOrganisation.name,
				//@ts-ignore
				registrationJSONIPFS: registstrationResponse[0].hash,
				//@ts-ignore
				removingJSONIPFS: removeResponse[0].hash,
			};

			// STEP 2: send ETH transaction to deploy organisation
			await writeTx(
				contractDeployOrg.writeAsync({
					args: [
						deployParams.orgGuid,
						deployParams.name,
						deployParams.registrationJSONIPFS,
						deployParams.removingJSONIPFS,
					],
					value: parseEther("0.06"),
				})
			);
			// https://goerli.etherscan.io/address/0x898b303a922016357e86ac2438719248225c11ef
			// string memory orgGuid, string memory name, string memory registrationJSONIPFS, string memory removingJSONIPFS, address payoutAddress (currently set it to 0x0000000000000000000000000000000000000000)
			// DOCS: https://wagmi.sh/examples/contract-write-dynamic

			// STEP 3: retrieve the address of the deployed organisation
			const deployedOrganisation = await getLatestOrganisation();
			//@ts-ignore
			const addOrgToKlerosJSONCopy = JSON.parse(
				JSON.stringify(AddOrgToKlerosJSON)
			);
			console.log(deployedOrganisation);
			addOrgToKlerosJSONCopy.values.Address = deployedOrganisation.address; // Replace with address of deployed organisation

			// STEP 4: upload addOrgToKlerosJSONCopy to IPFS
			const response = await KlerosIPFSService.publishToKlerosNode(
				"item.json",
				new TextEncoder().encode(addOrgToKlerosJSONCopy)
			);
			// Handle the response from IPFS, e.g., save the hash
			//@ts-ignore
			console.log(response[0].hash);
			// STEP 5:
			// function addOrganisationToTheList(uint256 orgIndex, string memory organisationJSONIPFS) public payable
			// We need to send ETH to this function, 0.06 ETH should be correct
			await writeTx(
				contractAddOrgToList.writeAsync({
					args: [
						parseEther("0.06"),
						deployedOrganisation.index,
						//@ts-ignore
						response[0].hash,
					],
					value: parseEther("0.06"),
				})
			);
			handleClose();
			setLoading(false);
		} catch (error) {
			setLoading(false);
			// Handle error during upload
			console.error("Error uploading organisation", error);
		}
	};

	return (
		<>
			<button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
				New Organisation
			</button>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center z-10">
					<div className="modal modal-open">
						<div className="modal-box" ref={ref}>
							<button
								onClick={handleClose}
								className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>
								✕
							</button>
							<h2 className="text-2xl font-bold">New Organisation</h2>
							<div className="modal-body">
								<div className="my-2">
									<p className="font-bold my-1">Name</p>
									<input
										type="text"
										name="name"
										value={newOrganisation.name}
										onChange={handleChange}
										className="input input-bordered w-full"
										placeholder="Enter organisation name"
										required
									/>
								</div>
							</div>
							<div className="modal-footer space-x-2 text-right mt-3">
								<button className="btn" onClick={handleClose}>
									Cancel
								</button>
								<button
									className="btn btn-primary"
									onClick={handleSubmit}
									disabled={loading}
								>
									{!loading ? "Save" : "Loading"}
								</button>
							</div>
						</div>
					</div>
					<div className="modal-backdrop"></div>
				</div>
			)}
		</>
	);
};

export default OrganisationDialog;
