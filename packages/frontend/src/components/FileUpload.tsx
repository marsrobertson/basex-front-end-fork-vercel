/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import { deepEqual } from "wagmi";
import KlerosIPFSService from "../services/IPFSService";

const FileUpload = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [ipfsHash, setIpfsHash] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

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

				setIpfsHash(klerosResult.hash);
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

			reader.onerror = (event) => {
				reject(new Error("Error reading file"));
			};

			reader.readAsArrayBuffer(file);
		});
	};

	return (
		<div>
			<h4 className="text-xl my-2 text-bold">Upload to Kleros IPFS</h4>
			<input
				type="file"
				className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
				onChange={handleFileChange}
			/>
			<button
				className="btn btn-active btn-secondary block mx-auto my-3"
				onClick={handleUpload}
				disabled={!selectedFile || uploading}
			>
				Upload File
			</button>

			{uploading && <div>Uploading...</div>}
			{ipfsHash && <div>File uploaded. IPFS hash: {ipfsHash}</div>}
			{error && <div>Error: {error}</div>}
		</div>
	);
};

export default FileUpload;
