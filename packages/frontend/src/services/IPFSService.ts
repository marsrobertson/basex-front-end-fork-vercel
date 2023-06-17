/* eslint-disable @typescript-eslint/ban-ts-comment */

// const mirroredExtensions = [".json"];

interface IPFSResponse {
	hash: string;
	path: string;
}

export interface KlerosIPFSService {
	publishToKlerosNode: (
		fileName: string,
		data: ArrayBuffer
	) => Promise<IPFSResponse>;
	publishToTheGraphNode: (
		fileName: string,
		data: ArrayBuffer
	) => Promise<IPFSResponse[]>;
}

const KlerosIPFSService: KlerosIPFSService = {
	publishToKlerosNode: async (fileName, data) => {
		const buffer = new Uint8Array(data);
		const url = `${import.meta.env.VITE_IPFS_GATEWAY}/add`;

		const response = await fetch(url, {
			method: "POST",
			body: JSON.stringify({
				fileName,
				buffer: { 
							data: Array.from(buffer),
							type: "Buffer"
						}
			}),
			headers: {
				"content-type": "application/json",
			},
		});

		const body = await response.json();

		return body.data;
	},

	publishToTheGraphNode: async (fileName, data) => {
		const url = `${
			import.meta.env.VITE_HOSTED_GRAPH_IPFS_ENDPOINT
		}/api/v0/add?wrap-with-directory=true`;

		const payload = new FormData();
		payload.append("file", new Blob([data]), fileName);

		const response = await fetch(url, {
			method: "POST",
			body: payload,
		});
		//@ts-ignore
		const result = await jsonStreamToPromise(response.body);

		return result.map(({ Name, Hash }) => ({
			hash: Hash,
			path: `/${Name}`,
		}));
	},
};

async function jsonStreamToPromise(
	stream: ReadableStream<Uint8Array>
): Promise<any[]> {
	const reader = stream.getReader();
	const decoder = new TextDecoder("utf-8");

	const deferred = {
		resolve: undefined,
		reject: undefined,
	};

	const result = new Promise<any[]>((resolve, reject) => {
		//@ts-ignore
		deferred.resolve = resolve;
		//@ts-ignore
		deferred.reject = reject;
	});

	const acc: any[] = [];
	const start = async () => {
		reader
			.read()
			.then(({ done, value }) => {
				//@ts-ignore
				if (done) return deferred.resolve(acc);

				const lines = decoder.decode(value).split(/\n/);
				const objects = lines
					.filter((line) => line.trim() !== "")
					.map((line) => JSON.parse(line));
				acc.push(...objects);

				return start();
			})
			//@ts-ignore
			.catch((err) => deferred.reject(err));
	};

	start();

	return result;
}

export default KlerosIPFSService;
