import React, { useState } from "react";
import { Organisation } from "../../types/Organisation";
import { CreateOrgJSON, RemoveOrgJSON, AddOrgToKlerosJSON } from "../../services/DataScructures";

const OrganisationDialog = () => {
	const [open, setOpen] = useState(false);
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

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setNewOrganisation((prevOrganisation) => ({
			...prevOrganisation,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		let createOrgJSONCopy = JSON.parse(JSON.stringify(CreateOrgJSON)); // THINK: unsure if needed, erring on the side of caution

		createOrgJSONCopy.title                   = createOrgJSONCopy.title                  .replace("___NAME___", newOrganisation.name);
		createOrgJSONCopy.description             = createOrgJSONCopy.description            .replace("___NAME___", newOrganisation.name);
		createOrgJSONCopy.metadata.tcrTitle       = createOrgJSONCopy.metadata.tcrTitle      .replace("___NAME___", newOrganisation.name);
		createOrgJSONCopy.metadata.tcrDescription = createOrgJSONCopy.metadata.tcrDescription.replace("___NAME___", newOrganisation.name);

		// TODO 1A: upload createOrgJSONCopy to IPFS

		let removeOrgJSONCopy = JSON.parse(JSON.stringify(RemoveOrgJSON))
		removeOrgJSONCopy.title                   = removeOrgJSONCopy.title                  .replace("___NAME___", newOrganisation.name);
		removeOrgJSONCopy.description             = removeOrgJSONCopy.description            .replace("___NAME___", newOrganisation.name);
		removeOrgJSONCopy.metadata.tcrTitle       = removeOrgJSONCopy.metadata.tcrTitle      .replace("___NAME___", newOrganisation.name);
		removeOrgJSONCopy.metadata.tcrDescription = removeOrgJSONCopy.metadata.tcrDescription.replace("___NAME___", newOrganisation.name);

		// TODO 1B: upload removeOrgJSONCopy to IPFS

		// TODO 2: send ETH transaction to deploy organisation
		// DEPLOY ORGANISATION
		// https://goerli.etherscan.io/address/0x898b303a922016357e86ac2438719248225c11ef
		// string memory orgGuid, string memory name, string memory registrationJSONIPFS, string memory removingJSONIPFS, address payoutAddress
		// TODO 3: retrieve the address of the deployed organisation


		let addOrgToKlerosJSONCopy = JSON.parse(JSON.stringify(AddOrgToKlerosJSON))
		addOrgToKlerosJSONCopy.values.Address = "..............."; // Replace with address of deployed organisation

		// TODO 5: upload addOrgToKlerosJSONCopy to IPFS

		// TODO 6: 
		// function addOrganisationToTheList(uint256 orgIndex, string memory organisationJSONIPFS) public payable
		// We need to send ETH to this function, 0.06 ETH should be correct

		handleClose();
	};

	return (
		<>
			<button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
				New Organisation
			</button>
			{open && (
				<div className="fixed inset-0 flex items-center justify-center z-10">
					<div className="modal modal-open">
						<div className="modal-box">
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
								<button className="btn btn-primary" onClick={handleSubmit}>
									Save
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
