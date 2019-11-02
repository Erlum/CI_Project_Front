module.exports = class HTTPError extends Error {
    constructor(status, statusText, ...params) {
        // Pass remaining arguments (including vendor specific ones) to parent constructor
        super(...params);

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HTTPError);
        }

        this.name = 'HTTPError';
        // Custom debugging information
        this._status = status;
        this._statusText = statusText;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get statusText() {
        return this._statusText;
    }

    set statusText(value) {
        this._statusText = value;
    }
};