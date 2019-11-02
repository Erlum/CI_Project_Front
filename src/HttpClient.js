module.exports = class  {
    constructor(url) {
        this.url = url;
    }

    fetch(path, options) {
        return fetch(this.url + path, options)
            .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Bad status code from server: ' + response.status + response.statusText);
                    }
                    return response.bodyUsed ? response.json() : {};
                }
            );
    }
};