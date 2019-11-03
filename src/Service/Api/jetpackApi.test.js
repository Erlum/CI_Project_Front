const JetPackApi = require('./JetpackApi');
const JetPack = require('../../Entity/Jetpack');

describe('JetPackApi get JetPacks', function () {

    test('Test GetJetPacks', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        let jetpackApi = new JetPackApi(httpClientMock);
        jetpackApi.getJetPacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(JetPack);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64 ...");
        });
    });
});

describe('JetPackApi get a Jet Pack', function () {

    test('Test getJetPack', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "77",
                name: "The James Bond Jetpack",
                image: "007picture.jpg"
            }
        ]);

        let jetpackApi = new JetPackApi(httpClientMock);
        jetpackApi.getJetPack("77").then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(JetPack);
            expect(resp[0].id).toBe("77");
            expect(resp[0].name).toBe("The James Bond Jetpack");
            expect(resp[0].image).toBe("007picture.jpg");
        });
    });
});


describe('JetPackApi get JetPacks in range', function () {

    test('Test getJetPacksInRange', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        let jetpackApi = new JetPackApi(httpClientMock);
        let start = '2019-01-01';
        let end = '2042-01-01';
        jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(JetPack);
            expect(resp[0].id).toBe("123");
            expect(resp[0].name).toBe("The Jetpack");
            expect(resp[0].image).toBe("base64 ...");
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks?start_date=' + start + '&end_date=' + end);
        });
    });
});

describe('JetPackApi post JetPack', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    let jetPackEntry = {
        id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
        name: "big jet pack",
        image: "blurry.jpg"
    };
    httpClientMock.fetch.mockResolvedValue(jetPackEntry);

    let jetPackApi = new JetPackApi(httpClientMock);
    let jetPack = new JetPack(jetPackEntry.name, jetPackEntry.image);

    test('Test postJetPack return jetPack id', () => {
        return jetPackApi.postJetPack(jetPack).then(resp => {
            expect(jetPack.id).toBe(jetPackEntry.id);
        });
    });
    test('Test postJetPack call body jetPack name', () => {
        return jetPackApi.postJetPack(jetPack).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).name).toBe(jetPackEntry.name);
        });
    });
    test('Test postJetPack call body jetPack image', () => {
        return jetPackApi.postJetPack(jetPack).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).image).toBe(jetPackEntry.image);
        });
    });
    test('Test postJetPack call method', () => {
        return jetPackApi.postJetPack(jetPack).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("post");
        });
    });
});

describe('JetPackApi edit a JetPack', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    let jetPackEntry = {
        id: "77",
        name: "The James Bond Jetpack",
        image: "007picture.jpg"
    };
    httpClientMock.fetch.mockResolvedValue(jetPackEntry);

    let jetPackApi = new JetPackApi(httpClientMock);
    let jetPack = new JetPack(jetPackEntry.name, jetPackEntry.image, jetPackEntry.id);

    test('Test editJetPack return jetPack id', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(jetPack.id).toBe(jetPackEntry.id);
        });
    });
    test('Test editJetPack call body jetPack name', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).name).toBe(jetPackEntry.name);
        });
    });
    test('Test editJetPack call body jetPack image', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).image).toBe(jetPackEntry.image);
        });
    });
    test('Test editJetPack call method', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("patch");
        });
    });
});


describe('JetPackApi delete JetPack', function () {

    test('Test deleteJetPack', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        let jetPackEntry = {
            id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
            name: "big jet pack",
            image: "blurry.jpg"
        };

        let jetPackApi = new JetPackApi(httpClientMock);
        let jetPack = new JetPack(jetPackEntry);
        jetPackApi.deleteJetPack(jetPack);

        expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks?id=' + jetPack.id);
        expect(httpClientMock.fetch.mock.calls[0][1].method).toStrictEqual("delete");
    });
});