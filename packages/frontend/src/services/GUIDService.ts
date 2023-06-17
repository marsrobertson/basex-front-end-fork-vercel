import { v4 as uuidv4 } from "uuid";
// Usage: const guid = GUIDService.createGUID();
const GUIDService = {
	createGUID: () => {
		const guid = uuidv4();

		return guid;
	},
};

export default GUIDService;
