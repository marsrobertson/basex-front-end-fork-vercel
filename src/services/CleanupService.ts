import { Organisation } from "../types/Organisation";

const guidsToRemove = [
    "655ab21b-d38c-421e-bf2d-8e82ba5835e8",
    "b19fcfa8-5007-4a03-b783-ba3303769bc5",
    "69ae9928-0b2c-43e3-bcdf-ebeab1767387",
    "f839dd6a-e86f-4eeb-917f-ba1adfcd7ca6",
    "3d3b31f2-f913-43ba-99c2-3610ebfebe1b",
    "e6b9b77e-0a4f-42f5-ba7f-69e1c6409258",
    "bfd979e0-56cd-4e64-ac17-fdb37feb2ad2",
    "8566de5f-33c9-44e1-b07f-0b66938b2bdc",
    "68a1e9ae-4d69-4f2f-9ab7-206fbd46484e",
    "a111e273-ccf3-4630-9189-e962c1f34b93",
    "19790690-0cec-4789-a9dc-4587a6586d1c",
    "6157b6fb-27e9-4a55-b217-7a1520e429eb",
    "9801cae6-3f90-4f04-a26f-7f3a9f3e18fb",
    "69dc50ce-5b40-43cf-afe3-cdf59eb9f4b0",
    "7399edb9-6115-4526-b2ad-a07084807eb3",
    "86e14d51-58fe-49d6-ba8f-11a1a7d77180"
]

const CleanupService = {
	removeOrganisationGUIDs: (data: Organisation[]) => {
        let newData: Organisation[] = [];
        data.forEach((item) => {
            if (guidsToRemove.indexOf(item.orgGuid || "") === -1) {
                newData.push(item);
            }
        });
        return newData

	},
};

export default CleanupService;
