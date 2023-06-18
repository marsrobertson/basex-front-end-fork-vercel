/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { deepEqual } from "wagmi";
import KlerosIPFSService, { IPFSResponse } from "../services/IPFSService";

type FileUploadProps = {
	onUpload: (ipfsHash: string) => void;
};

const FileUpload = ({ onUpload }: FileUploadProps) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [ipfsHash, setIpfsHash] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (selectedFile) {
			handleUpload();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFile]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (selectedFile) {
			setUploading(true);
			setError(null);

			try {
				const { fileName, data } = await readFile(selectedFile);
				const [klerosResult, theGraphResult] = await Promise.all([
					KlerosIPFSService.publishToKlerosNode(fileName, data),
					KlerosIPFSService.publishToTheGraphNode(fileName, data),
				]);

				if (!deepEqual(klerosResult, theGraphResult)) {
					console.warn("IPFS upload result is different:", {
						kleros: klerosResult,
						theGraph: theGraphResult,
					});
					throw new Error("IPFS upload result is different.");
				}

				//@ts-ignore
				const ipfsHashes: IPFSResponse[] = klerosResult;
				const ipfsHash = ipfsHashes[0].hash;
				setIpfsHash(ipfsHash);
				onUpload(ipfsHash);
			} catch (error) {
				//@ts-ignore
				setError(error.message);
			} finally {
				setUploading(false);
			}
		}
	};

	const readFile = (
		file: File
	): Promise<{ fileName: string; data: ArrayBuffer }> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();

			reader.onload = (event) => {
				const { result } = event.target as FileReader;
				const fileName = file.name;
				const data = new Uint8Array(result as ArrayBuffer);
				resolve({ fileName, data });
			};

			reader.onerror = (_event) => {
				reject(new Error("Error reading file"));
			};

			reader.readAsArrayBuffer(file);
		});
	};

	return (
		<div>
			<input
				disabled={uploading}
				type="file"
				className="file-input file-input-bordered w-full max-w-xs"
				onChange={handleFileChange}
			/>

			{uploading && <div>Uploading...</div>}
			{!uploading && ipfsHash && (
				<div>
					<p className="font-bold">IPFS hash</p>
					<a
						href={`https://gateway.ipfs.io/ipfs/${ipfsHash}`}
						className="text-sm link text-black/50"
					>
						{ipfsHash}
					</a>
				</div>
			)}
			{error && <div>Error: {error}</div>}
		</div>
	);
};

export default FileUpload;
