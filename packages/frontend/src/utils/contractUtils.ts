import { BaseError as BaseViemError } from "viem";
/**
 * @dev utility function to parse error
 * @param e - error object
 * @returns {string} parsed error string
 */
export const getParsedError = (e: any | BaseViemError): string => {
	let message = "An unknown error occurred";

	if (e instanceof BaseViemError) {
		message = e.details;
	} else if (e?.data?.message) {
		message = e.data.message;
	} else if (e?.message) {
		message = e.message;
	}

	return message;
};
