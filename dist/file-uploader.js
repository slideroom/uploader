"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};

var FileUploader = (function () {
    function FileUploader() {
        _classCallCheck(this, FileUploader);

        this.uploading = false;
        this.pendingQueue = [];
    }

    _createClass(FileUploader, [{
        key: "queue",
        value: function queue(file) {
            if (Array.isArray(file)) {
                var _pendingQueue;

                (_pendingQueue = this.pendingQueue).push.apply(_pendingQueue, _toConsumableArray(file));
            } else {
                this.pendingQueue.push(file);
            }
            this.startNext();
        }
    }, {
        key: "startNext",
        value: function startNext() {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function callee$2$0() {
                var pendingFile;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            if (!this.uploading) {
                                context$3$0.next = 2;
                                break;
                            }

                            return context$3$0.abrupt("return");

                        case 2:
                            if (!(this.pendingQueue.length == 0)) {
                                context$3$0.next = 5;
                                break;
                            }

                            this.uploading = false;
                            return context$3$0.abrupt("return");

                        case 5:
                            pendingFile = this.pendingQueue.shift();

                            this.uploading = true;
                            context$3$0.next = 9;
                            return this.uploadFile(pendingFile);

                        case 9:
                            this.uploading = false;
                            context$3$0.next = 12;
                            return this.startNext();

                        case 12:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }, {
        key: "uploadFile",
        value: function uploadFile(file) {
            return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function callee$2$0() {
                var resolver, rejecter, returnPromise, xhr;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            if (!file.uploaded) {
                                context$3$0.next = 2;
                                break;
                            }

                            throw new Error("File Already Uploaded");

                        case 2:
                            if (!(file.uploadUrl.length == 0)) {
                                context$3$0.next = 4;
                                break;
                            }

                            throw new Error("Need Upload Url");

                        case 4:
                            resolver = null;
                            rejecter = null;
                            returnPromise = new Promise(function (res, rej) {
                                resolver = res;
                                rejecter = rej;
                            });
                            xhr = new XMLHttpRequest();

                            //const formData = new FormData();
                            //xhr.send
                            //formData.append("file", file.file);
                            xhr.upload.onprogress = function (e) {
                                if (!e.lengthComputable) return;
                                file.percent = Math.ceil(e.loaded / e.total * 100);
                            };
                            xhr.onload = function (e) {
                                if (xhr.status >= 200 && xhr.status <= 299) {
                                    file.finished();
                                    resolver();
                                } else {
                                    rejecter();
                                }
                            };
                            xhr.onerror = function (ev) {
                                debugger;
                                rejecter(ev);
                            };
                            xhr.open("PUT", file.uploadUrl, true);
                            xhr.send(file.file);
                            return context$3$0.abrupt("return", returnPromise);

                        case 14:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }]);

    return FileUploader;
})();

exports.FileUploader = FileUploader;