import { PendingFile } from "./pending-file";

export class FileGetter {
  private createElement(multiple = true): HTMLInputElement {
    const element = document.createElement("input");
    element.type = "file";
    element.multiple = multiple;
    element.style.position = "fixed";
    element.style.top = "-100px";

    document.body.appendChild(element);

    return element;
  }

  public async getFiles(multiple = true): Promise<PendingFile[]> {
    const element = this.createElement(multiple);

    let resolver = null;
    const returnPromise = new Promise<PendingFile[]>((res) => resolver = res);

    const event = document.createEvent("MouseEvents");
    (<any>event).__getFile = true;
    event.initEvent("click", true, true);
    element.dispatchEvent(event);

    const changeListener = (e) => {
      const pendingFiles: PendingFile[] = [];
      for (let i = 0; i < element.files.length; i++) {
        pendingFiles.push(new PendingFile(element.files[i]));
      }

      element.removeEventListener("change", changeListener);
      resolver(pendingFiles);
    };

    element.addEventListener("change", changeListener);

    return returnPromise;
  }
}
