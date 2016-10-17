export class PendingFile {
  public uploaded = false;
  public fileName = "";
  public fileSize = 0;
  public contentType = "";
  public percent = 0;

  public uploadUrl = "";

  private waiters: Array<() => void> = [];

  constructor(public file: File) {
    this.fileName = file.name;
    this.fileSize = file.size;
    this.contentType = file.type;
  }

  public waitUntilUploaded() {
    if (this.uploaded) return Promise.resolve<void>(null);
    return new Promise<void>((res) => this.waiters.push(res));
  }

  public finished() {
    this.percent = 100;
    this.uploaded = true;

    this.waiters.forEach(w => w());
    this.waiters = [];
  }
}

