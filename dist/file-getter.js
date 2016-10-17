"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _pendingFile = require("./pending-file");

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

var FileGetter = (function () {
    function FileGetter() {
        _classCallCheck(this, FileGetter);
    }

    _createClass(FileGetter, [{
        key: "createElement",
        value: function createElement() {
            var multiple = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            var element = document.createElement("input");
            element.type = "file";
            element.multiple = multiple;
            element.style.position = "fixed";
            element.style.top = "-100px";
            document.body.appendChild(element);
            return element;
        }
    }, {
        key: "getFiles",
        value: function getFiles() {
            var multiple = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

            return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                var element, resolver, returnPromise, event, changeListener;
                return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                        case 0:
                            element = this.createElement(multiple);
                            resolver = null;
                            returnPromise = new Promise(function (res) {
                                return resolver = res;
                            });
                            event = document.createEvent("MouseEvents");

                            event.initEvent("click", true, true);
                            element.dispatchEvent(event);

                            changeListener = function changeListener(e) {
                                var pendingFiles = [];
                                for (var i = 0; i < element.files.length; i++) {
                                    pendingFiles.push(new _pendingFile.PendingFile(element.files[i]));
                                }
                                element.removeEventListener("change", changeListener);
                                resolver(pendingFiles);
                            };

                            element.addEventListener("change", changeListener);
                            return context$3$0.abrupt("return", returnPromise);

                        case 9:
                        case "end":
                            return context$3$0.stop();
                    }
                }, callee$2$0, this);
            }));
        }
    }]);

    return FileGetter;
})();

exports.FileGetter = FileGetter;