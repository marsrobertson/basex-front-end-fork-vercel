/* eslint-disable @typescript-eslint/ban-ts-comment */
import { publicClient } from "../../utils/client";
import ABI from "../ABI";
import ADDRESS from "../Address";

const getLatestOrganisation = async (): Promise<{
    index: number ;
     address: `0x${string}`
}> => {
    
    try {
        //@ts-ignore
    const lenghtData= await publicClient.readContract({
  address: ADDRESS,
  abi: ABI,
  functionName: 'organisationsLength',
    })
        const latestOrgIndex = Number(lenghtData) - 1;
        const orgData = await publicClient.readContract({
            address: ADDRESS,
            abi: ABI,
            functionName: 'organisations',
            args: [BigInt(latestOrgIndex)]
        });
        //@ts-ignore
    return {
        //@ts-ignore
        index: latestOrgIndex,
        //@ts-ignore
        address: orgData[3]
    };
    }
    catch {
        throw new Error("Couldn't grab organisation data")
    }
}
export default getLatestOrganisation;