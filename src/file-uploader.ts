import { PendingFile } from "./pending-file";

export class FileUploader {
  private uploading = false;
  private pendingQueue: PendingFile[] = [];

  public queue(file: PendingFile | PendingFile[]) {
    if (Array.isArray(file)) {
      this.pendingQueue.push(...file);
    } else {
      this.pendingQueue.push(file);
    }

    this.startNext();
  }

  private async startNext() {
    if (this.uploading) return;

    if (this.pendingQueue.length == 0) {
      this.uploading = false;
      return;
    }

    const pendingFile = this.pendingQueue.shift();

    this.uploading = true;
    await this.uploadFile(pendingFile);
    this.uploading = false;

    await this.startNext();
  }

  private async uploadFile(file: PendingFile) {
    if (file.uploaded) throw new Error("File Already Uploaded");
    if (file.uploadUrl.length == 0) throw new Error("Need Upload Url");

    let resolver = null;
    let rejecter = null;
    const returnPromise = new Promise<void>((res, rej) => {
      resolver = res;
      rejecter = rej;
    });

    const xhr = new XMLHttpRequest();
    //const formData = new FormData();

    //xhr.send

    //formData.append("file", file.file);

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;
      file.percent = Math.ceil((e.loaded / e.total) * 100);
    };

    xhr.onload = (e) => {
      if (xhr.status >= 200 && xhr.status <= 299) {
        file.finished();

        resolver();
      } else {
        rejecter();
      }
    };

    xhr.onerror = (ev) => {
      debugger;
      rejecter(ev);
    };

    xhr.open("PUT", file.uploadUrl, true);

    if (file.contentType) {
      xhr.setRequestHeader("Content-Type", file.contentType);
    }

    xhr.send(file.file);

    return returnPromise;
  }
}
