const JetPack = require('../../Entity/Jetpack');
module.exports = class {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetPacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {
            return rows.map(row => {
                return new JetPack(row.name, row.image, row.id);
            });
        });
    }

    getJetPack(id) {
        return this.httpClient.fetch('/jetpacks/' + id, {}).then(row => {
            return new JetPack(row.name, row.image, row.id);
        });
    }

    getJetPacksInRange(start, end) {
        return this.httpClient.fetch('/jetpacks?start_date=' + start + '&end_date=' + end, {}).then(rows => {
            return rows.map(row => {
                return new JetPack(row.name, row.image, row.id);
            });
        });
    }

    postJetPack(jetPack) {
        return this.httpClient.fetch('/jetpacks', {
            method: "post",
            body: JSON.stringify({
                "name": jetPack.name,
                "image": jetPack.image
            })
        }).then(response => {
            jetPack.id = response.id;
        });
    }

    editJetPack(jetPack) {
        return this.httpClient.fetch('/jetpacks/' + jetPack.id, {
            method: "put",  // patch is not supported by express.
            body: JSON.stringify({
                "name": jetPack.name,
                "image": jetPack.image
            })
        });
    }

    // change parameter from object to string
    deleteJetPack(jetPack_id) {
        return this.httpClient.fetch('/jetpacks/' + jetPack_id, {
            method: "delete"
        });
    }
};

