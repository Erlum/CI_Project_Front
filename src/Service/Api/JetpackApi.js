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
        return this.httpClient.fetch('/jetpacks?id=' + id, {}).then(rows => {

            return rows.map(row => {
                return new JetPack(row.name, row.image, row.id);
            });
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
            name: jetPack.name,
            image: jetPack.image,
            method: "post"
        }).then(response => {
            jetPack.id = response[0].id
            console.log(jetPack.id)
        });
    }

    editJetPack(jetPack) {
        return this.httpClient.fetch('/jetpacks?id=', {
            name: jetPack.name,
            image: jetPack.image,
            method: "patch"
        }).then(response => {
            jetPack.id = response[0].id;
        });
    }

    deleteJetPack(jetPack) {
        this.httpClient.fetch('/jetpacks?id=' + jetPack.id, {
            method: "delete"
        });
    }
};

