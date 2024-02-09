/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState, useEffect } from "react";
import { Report } from "../../types/Report";
import { useOnClickOutside } from "usehooks-ts";
import FileUpload from "../FileUpload";
import KlerosIPFSService from "../../services/IPFSService";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import ABI_prod from "../../contracts/ABI_prod";
import ADDRESS_prod from "../../contracts/Address_prod";
import ABI_staging from "../../contracts/ABI_staging";
import ADDRESS_staging from "../../contracts/Address_staging";
import GUIDService from "../../services/GUIDService";
import { parseEther } from "viem";
import { useTransactor } from "../../hooks/useTransactor";
import { Organisation } from "../../types/Organisation";
import ConnectModal from "../utils/ConnectModal";
import { useSetAtom } from "jotai";
import { reloadReports } from "../../atoms/reloadTriggers";
import Datepicker from "react-tailwindcss-datepicker";
import RequiredFieldIndicator from "../../utils/RequiredFieldIndicator";
import dayjs from "dayjs";
import CleanupService from "../../services/CleanupService";

const STAGING = import.meta.env.VITE_STAGING;
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

interface FieldErrors {
    organisationGUID?: string;
    title?: string;
    ipfs?: string;
    source?: string;
}
const ReportDialog = () => {
    const setReloadReports = useSetAtom(reloadReports);
    const [open, setOpen] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const ref = useRef(null);
    const { address } = useAccount();
    const [loading, setLoading] = useState(false);
    const writeTx = useTransactor();
    //@ts-ignore
    const contractAddReport = useContractWrite({
        address: ADDRESS,
        abi: ABI,
        functionName: "addItem",
    });
    const { data } = useContractRead({
        address: ADDRESS,
        abi: ABI,
        functionName: "getOrganisations",
    });

    const [filteredData, setFilteredData] = useState<Organisation[]>([]);
    useEffect(() => {
        if (data) {
            const newData = CleanupService.removeOrganisationGUIDs(data as Organisation[]);
            setFilteredData(newData)
        }
    }, [data]);

    const currentDate = new Date();
    const beginningOfPreviousYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfPreviousYear = new Date(currentDate.getFullYear() - 1, 11, 31);

    const [newReport, setNewReport] = useState<Report>({
        organisationGUID: "",
        title: "",
        comments: "",
        uploadDate: new Date(),
        accountingPeriodStart: beginningOfPreviousYear,
        accountingPeriodEnd: endOfPreviousYear,
        source: "",
        ipfs: "",
        reportGUID: "",
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewReport({
            organisationGUID: "",
            title: "",
            comments: "",
            uploadDate: new Date(),
            accountingPeriodStart: beginningOfPreviousYear,
            accountingPeriodEnd: endOfPreviousYear,
            source: "",
            ipfs: "",
            reportGUID: "",
        });
    };

    useOnClickOutside(ref, () => {
        handleClose();
    });

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;
        setNewReport((prevReport) => ({
            ...prevReport,
            [name]: value,
        }));
    };

    const handleFileChange = async (ipfsHash: string) => {
        setNewReport((prevReport) => ({
            ...prevReport,
            ipfs: ipfsHash,
        }));
    };

    const handleSubmit = async () => {
        const errors: FieldErrors = {};

        if (!newReport.organisationGUID) {
            errors.organisationGUID = "Organisation is required";
        }
        if (!newReport.title) {
            errors.title = "Title is required";
        }
        if (!newReport.ipfs) {
            errors.ipfs = "File upload is required";
        }

        setFieldErrors(errors);

        if (Object.keys(errors).length > 0) {
            return; // Don't proceed with submission
        }

        try {
            setLoading(true);
            // ... (rest of your handleSubmit logic)
        } catch (error) {
            setLoading(false);
            console.error("Error uploading report", error);
        }
        try {
            setLoading(true);
            const item = {
                columns: [
                    {
                        label: "Title",
                        description: "...",
                        type: "text",
                        isIdentifier: true,
                    },
                    {
                        label: "Comments",
                        description: "...",
                        type: "text",
                    },
                    {
                        label: "Source",
                        description: "...",
                        type: "text",
                        isIdentifier: false,
                    },
                    // Add other columns here
                ],
                values: {
                    Title: newReport.title,
                    Comments: newReport.comments,
                    Source: newReport.source,
                    Report: newReport.ipfs,
                    "Start Date": newReport.accountingPeriodStart,
                    "End Date": newReport.accountingPeriodEnd,
                    "Upload Date": dayjs().toISOString(),
                    // Set other values based on the form inputs
                },
            };

            const itemJson = JSON.stringify(item);
            const response = await KlerosIPFSService.publishToKlerosNode(
                "item.json",
                new TextEncoder().encode(itemJson)
            );

            // Handle the response from IPFS, e.g., save the hash
            //@ts-ignore
            console.log(response[0].hash);
            //@ts-ignore
            const organizationIndex = data.findIndex(
                (organization: Organisation) =>
                    organization.orgGuid === newReport.organisationGUID
            );
            // THE CONTRACT CALL PARAMS
            const params = {
                itemGuid: GUIDService.createGUID(),
                itemName: newReport.title,
                targetGuid: newReport.organisationGUID,
                orgIndex: organizationIndex,
                //@ts-ignore
                JSONIPFS: `/ipfs/${response[0].hash}`,
                PVTval: 0,
                NVTval: 0,
            };

            //@ts-ignore
            await writeTx(
                contractAddReport.writeAsync({
                    args: [
                        params.itemGuid,
                        params.itemName,
                        params.targetGuid,
                        params.orgIndex,
                        params.JSONIPFS,
                        params.PVTval,
                        params.NVTval,
                    ],
                    value: parseEther("0.08"),
                }),
                { onBlockConfirmation: () => handleClose() }
            );
            setLoading(false);
            setReloadReports(true);
            handleClose();
        } catch (error) {
            setLoading(false);
            // Handle error during upload
            console.error("Error uploading report", error);
        }
    };

    return (
        <>
            <button className="btn btn-outline btn-primary my-2" onClick={handleOpen}>
                New Report
            </button>
            {open && !address && <ConnectModal {...{ ref, handleClose }} />}
            {open && address && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="modal modal-open">
                        <div className="modal-box h-screen md:h-auto" ref={ref}>
                            <button
                                onClick={handleClose}
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold">New Report</h2>

                            <p className="mt-3 mb-6">
                                You can upload an existing impact report or create a new one
                                using{" "}
                                <a
                                    className="link"
                                    target="_blank"
                                    href="https://docs.google.com/document/d/1X69Fh6_c0RDEQvXzmb--s2Cqzl24AuSnC7HXuDDAALY/edit?usp=sharing"
                                >
                                    our template
                                </a>
                                .
                            </p>

                            <div className="modal-body">
                                <div className="my-2">
                                    <p className="font-bold my-1">
                                        Organisation
                                        <RequiredFieldIndicator />
                                    </p>
                                    {/* <input
										type="text"
										name="organisation"
										value={newReport.organisation}
										onChange={handleChange}
										className="input input-bordered w-full"
										placeholder="Enter organisation name"
										required
									/> */}
                                    <select
                                        name="organisationGUID"
                                        className={`select select-bordered w-full ${fieldErrors.organisationGUID ? "input-error" : ""
                                            }`}
                                        value={newReport.organisationGUID}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option disabled value="">
                                            Select organisation to report on
                                        </option>

                                        {
                                            //@ts-ignore
                                            filteredData.map(
                                                (organisation: Organisation) => (
                                                    <option
                                                        key={organisation.orgGuid}
                                                        value={organisation.orgGuid}
                                                    >
                                                        {organisation.name}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                    {fieldErrors.organisationGUID && (
                                        <p className="text-red-600 my-1">
                                            {fieldErrors.organisationGUID}
                                        </p>
                                    )}
                                </div>
                                <div className="my-2">
                                    <p className="font-bold my-1">
                                        Title
                                        <RequiredFieldIndicator />
                                    </p>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newReport.title}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full ${fieldErrors.title ? "input-error" : ""
                                            }`}
                                        placeholder="Enter report title"
                                        required
                                    />
                                    {fieldErrors.title && (
                                        <p className="text-red-600 my-1">{fieldErrors.title}</p>
                                    )}
                                </div>
                                <div className="my-2">
                                    <p className="font-bold my-1">Accounting period</p>
                                    <Datepicker
                                        useRange={false}
                                        primaryColor="blue"
                                        value={{
                                            startDate: newReport.accountingPeriodStart,
                                            endDate: newReport.accountingPeriodEnd,
                                        }}
                                        onChange={(newVal) => {
                                            setNewReport({
                                                ...newReport,
                                                accountingPeriodStart: dayjs(
                                                    newVal?.startDate?.toString()
                                                ).toDate(),
                                                accountingPeriodEnd: dayjs(
                                                    newVal?.endDate?.toString()
                                                ).toDate(),
                                            });
                                        }}
                                    />
                                </div>

                                <div className="mb-2 mt-12">
                                    <p className="font-bold my-1">Comments</p>
                                    <textarea
                                        name="comments"
                                        value={newReport.comments}
                                        onChange={handleChange}
                                        className="textarea textarea-bordered w-full text-base"
                                        placeholder="Enter comments"
                                    ></textarea>
                                </div>
                                <div className="my-2">
                                    <p className="font-bold my-1">Source URL</p>
                                    <input
                                        type="text"
                                        name="source"
                                        value={newReport.source}
                                        onChange={handleChange}
                                        className={`input input-bordered w-full ${fieldErrors.source ? "input-error" : ""
                                            }`}
                                        placeholder="If the report is hosted on the on the web, enter the URL"
                                    />
                                    {fieldErrors.title && (
                                        <p className="text-red-600 my-1">{fieldErrors.source}</p>
                                    )}
                                </div>
                                <div className="my-2">
                                    <p className="font-bold my-1">
                                        Add File
                                        <RequiredFieldIndicator />
                                    </p>
                                    <FileUpload onUpload={handleFileChange} required />
                                    {fieldErrors.ipfs && (
                                        <p className="text-red-600">{fieldErrors.ipfs}</p>
                                    )}
                                </div>
                                {/* Add other form fields here */}
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

export default ReportDialog;
