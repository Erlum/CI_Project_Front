const HTTPError = require('./Entity/HTTPError') ;

module.exports = class  {
    constructor(url) {
        this.url = url;
    }

    fetch(path, options) {
        // Set required options if missing.
        // The second dictionary overwrites the first.
        options["headers"] = Object.assign({}, {
            'Accept': 'application/json'
        }, options["headers"]);
        // don't set Content-Type unless it's needed.
        if ("body" in options){
            options["headers"] = Object.assign({}, {
                'Content-Type': 'application/json',
            }, options["headers"]);
        }
        return fetch(this.url + path, options).then(function (response) {
                if (!response.ok) {
                    throw new HTTPError(response.status, response.statusText);
                }
                return response.body ? response.json() : {};
            }
        );
    }
};