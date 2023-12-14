declare module 'uploader/pending-file' {
	export class PendingFile {
	    file: File;
	    uploaded: boolean;
	    fileName: string;
	    fileSize: number;
	    contentType: string;
	    percent: number;
	    uploadUrl: string;
	    private waiters;
	    constructor(file: File);
	    waitUntilUploaded(): Promise<void>;
	    finished(): void;
	}

}
declare module 'uploader/file-uploader' {
	import { PendingFile } from 'uploader/pending-file';
	export class FileUploader {
	    private uploading;
	    private pendingQueue;
	    queue(file: PendingFile | PendingFile[]): void;
	    private startNext;
	    private uploadFile;
	}

}
declare module 'uploader/file-getter' {
	import { PendingFile } from 'uploader/pending-file';
	export class FileGetter {
	    private createElement;
	    getFiles(multiple?: boolean): Promise<PendingFile[]>;
	}

}
declare module 'uploader' {
	export { FileUploader } from 'uploader/file-uploader';
	export { FileGetter } from 'uploader/file-getter';
	export { PendingFile } from 'uploader/pending-file';

}
