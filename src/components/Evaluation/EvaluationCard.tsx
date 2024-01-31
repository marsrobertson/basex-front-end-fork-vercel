/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import ABI_prod from "../../contracts/ABI_prod";
import ADDRESS_prod from "../../contracts/Address_prod";
import ABI_staging from "../../contracts/ABI_staging";
import ADDRESS_staging from "../../contracts/Address_staging";
import { Evaluation } from "../../types/Evaluation";
import { Organisation } from "../../types/Organisation";
import { toDateTimeString } from "../../utils/dateUtils";
import { planetaryBoundaries } from "../../utils/categoriesEval";

const STAGING = import.meta.env.VITE_STAGING;
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const EvaluationCard = ({ evaluation }: { evaluation: Evaluation }) => {
    const { organisationGUID, title, evaluationContent, uploadDate, pvt, nvt } =
        evaluation;
    const getOrganisations = useContractRead({
        address: ADDRESS,
        abi: ABI,
        functionName: "getOrganisations",
    });
    const justifications = evaluation?.evaluationContent?.justifications;
    const [organisation, setOrganisation] = useState<Organisation>();
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
        <div className="card bg-base-100 my-3 border-2 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-lg font-bold mb-3">{title}</h2>
                {organisation?.name && (
                    <section>
                        <h3 className="text-base font-bold mb-2">Organisation</h3>
                        <p className="text-gray-600">
                            {organisation?.name !== "" ? organisation?.name : "X Inc."}
                        </p>
                    </section>
                )}
                <section>
                    <h3 className="text-base font-bold mb-2">Comments</h3>
                    <p className="text-gray-600 max-h-[300px] overflow-y-auto">
                        {evaluationContent?.comments ?? "None"}
                    </p>
                </section>
                <section>
                    <h3 className="text-base font-bold mb-1">Positive Value</h3>
                    <p className="text-gray-600">{pvt}</p>
                    <h3 className="text-base font-bold mb-1">Negative Value</h3>
                    <p className="text-gray-600">{nvt}</p>
                    {evaluation.h2o !== 0 && (
                        <>
                            <h3 className="text-base font-bold mb-1">Water consumption</h3>
                            <p className="text-gray-600">{evaluation.h2o}</p>
                        </>
                    )}
                    {evaluation.co2 !== 0 && (
                        <>
                            <h3 className="text-base font-bold mb-1">
                                Greenhouse gas output
                            </h3>
                            <p className="text-gray-600">{evaluation.co2}</p>
                        </>
                    )}
                </section>

                {justifications &&
                    Object.keys(justifications).flatMap((category) => {
                        return (justifications[category] ?? []).map(
                            (justification, index) => (
                                <div key={index} className="flex items-center mb-4">
                                    {justification.imageURL !== "planetary" && (
                                        <div className="w-10 h-10 mr-4">
                                            <img
                                                src={justification.imageURL}
                                                alt="Justification"
                                                className="object-cover max-w-24 max-h-24 min-w-[40px] "
                                            />
                                        </div>
                                    )}
                                    <div>
                                        {justification.imageURL === "planetary" && (
                                            <p className="font-bold text-gray-400 mt-2">
                                                {justification.planetaryBoundary ??
                                                    planetaryBoundaries[index]}
                                            </p>
                                        )}
                                        <p className="text-gray-600 max-h-[300px] overflow-y-auto">
                                            {justification.comment}
                                        </p>
                                        <p className="text-gray-600">
                                            Percentage: {justification.percentage}%
                                        </p>
                                    </div>
                                </div>
                            )
                        );
                    })}
                {/* <section>
					<h3 className="text-base font-bold mb-2">Author</h3>
					<p className="text-gray-600">{author}</p>
				</section> */}
                <section>
                    <h3 className="text-base font-bold mb-2">Upload Date</h3>
                    <p className="text-gray-600">
                        {toDateTimeString(
                            new Date(uploadDate ? uploadDate.toString() : "")
                        )}
                    </p>
                </section>
                {/* <div className="card-actions justify-end">
					<button className="btn btn-primary">View Evaluation</button>
				</div> */}
            </div>
        </div>
    );
};

export default EvaluationCard;
