// Usage: const guid = GUIDService.createGUID();
const GUIDService = {
	createGUID: () => {
		const guid = crypto.randomUUID();

		return guid;
	},
};

export default GUIDService;
