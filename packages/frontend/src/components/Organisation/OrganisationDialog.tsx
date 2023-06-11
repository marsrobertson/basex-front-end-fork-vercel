import React, { useState } from "react";
import { Organisation } from "../../types/Organisation";

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
		// Perform any additional validation or processing here

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
