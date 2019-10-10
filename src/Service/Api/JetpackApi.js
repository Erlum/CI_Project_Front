const JetPack = require('../../Entity/Jetpack');
module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getJetPacks() {
        return this.httpClient.fetch('/jetpacks', {}).then(rows => {

            return rows.map(row => {
                let jetPack = new JetPack();
                jetPack.id = row.id;
                jetPack.name = row.name;
                jetPack.image = row.image;
                return jetPack
            });
        });
    }

    postJetPack(jetPack) {
        return this.httpClient.fetch('/jetpacks', {
            name: jetPack.name,
            image: jetPack.image,
            method: "post"
        }).then(response => {
            jetPack.id = response[0].id;
        });
    }
};