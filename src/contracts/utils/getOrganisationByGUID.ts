/* eslint-disable @typescript-eslint/ban-ts-comment */
import { publicClient } from "../../utils/client";
import ABI_prod from "../../contracts/ABI_prod";
import ADDRESS_prod from "../../contracts/Address_prod";
import ABI_staging from "../../contracts/ABI_staging";
import ADDRESS_staging from "../../contracts/Address_staging";

const STAGING = import.meta.env.VITE_STAGING
const ABI = STAGING ? ABI_staging : ABI_prod;
const ADDRESS = STAGING ? ADDRESS_staging : ADDRESS_prod;

const getOrganisationByGUID = async (guid:string): Promise<{
    index: number ;
     address: `0x${string}`
}> => {
    
    try {
        //@ts-ignore
    const indexData= await publicClient.readContract({
  address: ADDRESS,
  abi: ABI,
        functionName: 'orgGuidToIndex',
  args:[guid]
    })
        
        const orgData = await publicClient.readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'getOrganisation',
            args: [indexData]
        });
        //@ts-ignore
    return {
        //@ts-ignore
        index: Number(indexData),
        //@ts-ignore
        address: orgData.klerosAddress
    };
    }
    catch (e: any) {
        throw new Error("Couldn't grab organisation data")
    }
}
export default getOrganisationByGUID;