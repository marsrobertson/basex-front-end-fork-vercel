/* eslint-disable @typescript-eslint/ban-ts-comment */
import { publicClient } from "../../utils/client";
import ABI from "../ABI";
import ADDRESS from "../Address";

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
            args: [Number(indexData)]
        });
        //@ts-ignore
    return {
        //@ts-ignore
        index: index,
        //@ts-ignore
        address: orgData[3]
    };
    }
    catch {
        throw new Error("Couldn't grab organisation data")
    }
}
export default getOrganisationByGUID;