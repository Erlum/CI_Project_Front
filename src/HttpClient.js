const HTTPError = require('./Entity/HTTPError') ;

module.exports = class  {
    constructor(url) {
        this.url = url;
    }

    fetch(path, options) {
        return fetch(this.url + path, options).then(function (response) {
                if (!response.ok) {
                    throw new HTTPError(response.status, response.statusText);
                }
                return response.bodyUsed ? response.json() : {};
            }
        );
    }
};