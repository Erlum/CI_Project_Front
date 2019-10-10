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
            expect(resp[0]).toBeInstanceOf(JetPack)
        });
    });
});

describe('JetPackApi post JetPack', function () {

    test('Test postJetPack', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        let jetPackEntry = {
            id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
            name: "big jet pack",
            image: "blurry.jpg"
        };
        httpClientMock.fetch.mockResolvedValue([
            jetPackEntry
        ]);

        let jetPackApi = new JetPackApi(httpClientMock);
        let jetPack = new JetPack();
        jetPack.name = jetPackEntry.name;
        jetPack.image = jetPackEntry.image;

        jetPackApi.postJetPack(jetPack).then(resp => {
            expect(jetPack.id).toBe(jetPackEntry.id);
            expect(httpClientMock.fetch.mock.calls[0][1].name).toBe(jetPackEntry.name);
            expect(httpClientMock.fetch.mock.calls[0][1].image).toBe(jetPackEntry.image);
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("delete");
        });
    });
});

describe('JetPackApi delete JetPack', function () {

    test('Test postJetPack', () => {
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