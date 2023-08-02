export interface Organisation {
	JSONIPFS?: string;
	NVT?: bigint;
	NVTHistorical?: bigint;
	PVT?: bigint;
	PVTHistorical?: bigint;
	klerosAddress?: string;
	name: string;
	id?: number;
	orgGuid?: string;
	payoutWallet?: string;
}
