/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Report } from "../../types/Report";
import EvaluationDialog from "../Evaluation/EvaluationDialog";
import { useContractRead } from "wagmi";
import ABI_prod from "../../contracts/ABI_prod";
import ADDRESS_prod from "../../contracts/Address_prod";
import ABI_staging from "../../contracts/ABI_staging";
import ADDRESS_staging from "../../contracts/Address_staging";
import { Organisation } from "../../types/Organisation";
import { toDateTimeString } from '../../utils/dateUtils';
import dayjs from "dayjs";
const STAGING = import.meta.env.VITE_STAGING
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const ReportCard = ({ report }: { report: Report }) => {
    const {
        organisationGUID,
        title,
        comments,
        uploadDate,
        // accountingPeriodStart,
        // accountingPeriodEnd,
        ipfs,
    } = report;
    const getOrganisations = useContractRead({
        address: ADDRESS,
        abi: ABI,
        functionName: "getOrganisations",
    });
    const [organisation, setOrganisation] = useState<Organisation>({ name: "" });
    useEffect(() => {
        if (getOrganisations.data) {
            //@ts-ignore
            getOrganisations.data.map((org: Organisation, i: number) => {
                if (org.orgGuid === organisationGUID) {
                    setOrganisation({ ...org, id: i });
                }
            });
        }
    }, [getOrganisations.data, organisationGUID]);

    return (
        <div className="card bg-base-100  my-3 border-2 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-lg font-bold mb-3">
                    {title !== "" ? title : "New Report"}
                </h2>
                <p className="text-gray-400 mb-2">
                    {organisation?.name ? organisation?.name : "X Inc."}
                </p>
                <p className="text-gray-600 mb-2 max-h-[300px] overflow-y-auto">{comments}</p>
                <p className="text-gray-600 mb-2">
                    Upload Date: {toDateTimeString(new Date(uploadDate))}
                </p>
                <p className="text-black font-semibold mb-1">
                    Accouting Period
                </p>
                <p className="text-gray-600 mb-2">
                    {dayjs(report.accountingPeriodStart).format("DD/MM/YYYY")} - {dayjs(report.accountingPeriodEnd).format("DD/MM/YYYY")}
                </p>
                {/* <p className="text-gray-600 mb-4">
					Accounting Period:{" "}
					{(accountingPeriodStart ?? new Date()).toDateString()} -{" "}
					{(
						accountingPeriodEnd ??
						new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
					).toDateString()}
				</p> */}
                {ipfs && (
                    <div className="my-1">
                        <a
                            href={`https://ipfs.kleros.io/ipfs/${ipfs}`}
                            className="text-sm link text-black/50"
                            target="_blank"
                        >
                            Full report
                        </a>
                    </div>
                )}
                <div className="card-actions justify-end">
                    {/* <a
						href={source}
						className="btn btn-info mr-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Report
					</a>
					<a
						href={ipfs}
						className="btn btn-secondary"
						target="_blank"
						rel="noopener noreferrer"
					>
						View on IPFS
					</a> */}
                    <EvaluationDialog
                        report={report}
                        organisation={
                            organisation ?? {
                                name: "X Inc.",
                                id: 0,
                                orgGuid: "0000-0000-0000-0000",
                            }
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
