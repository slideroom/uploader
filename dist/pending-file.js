"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PendingFile = (function () {
    function PendingFile(file) {
        _classCallCheck(this, PendingFile);

        this.file = file;
        this.uploaded = false;
        this.fileName = "";
        this.fileSize = 0;
        this.contentType = "";
        this.percent = 0;
        this.uploadUrl = "";
        this.waiters = [];
        this.fileName = file.name;
        this.fileSize = file.size;
        this.contentType = file.type;
    }

    _createClass(PendingFile, [{
        key: "waitUntilUploaded",
        value: function waitUntilUploaded() {
            var _this = this;

            if (this.uploaded) return Promise.resolve(null);
            return new Promise(function (res) {
                return _this.waiters.push(res);
            });
        }
    }, {
        key: "finished",
        value: function finished() {
            this.percent = 100;
            this.uploaded = true;
            this.waiters.forEach(function (w) {
                return w();
            });
            this.waiters = [];
        }
    }]);

    return PendingFile;
})();

exports.PendingFile = PendingFile;