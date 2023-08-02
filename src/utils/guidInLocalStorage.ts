const isGuidInLocalStorage = (guid: string) => {
	const storedData = localStorage.getItem("organisationsData");
	const organisationsData = storedData ? JSON.parse(storedData) : [];

	return organisationsData.some((org: any) => org.orgGuid === guid);
};

export default isGuidInLocalStorage;
