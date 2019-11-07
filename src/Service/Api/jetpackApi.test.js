const JetPackApi = require('./JetpackApi');
const JetPack = require('../../Entity/Jetpack');

describe('JetPackApi get JetPacks', function () {
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

    test('Test GetJetPacks return type', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
        });
    });
    test('Test GetJetPacks return length', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(resp.length).toBe(1);
        });
    });
    test('Test GetJetPacks return unit type', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(resp[0]).toBeInstanceOf(JetPack);
        });
    });
    test('Test GetJetPacks return unit jetpack id', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(resp[0].id).toBe("123");
        });
    });
    test('Test GetJetPacks return unit jetpack name', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(resp[0].name).toBe("The Jetpack");
        });
    });
    test('Test GetJetPacks return unit jetpack image', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(resp[0].image).toBe("base64 ...");
        });
    });
    test('Test GetJetPacks call path', () => {
        return jetpackApi.getJetPacks().then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks');
        });
    });
});

describe('JetPackApi get a Jet Pack', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    const jetpack_id = "77";
    httpClientMock.fetch.mockResolvedValue({
        id: jetpack_id,
        name: "The James Bond Jetpack",
        image: "007picture.jpg"
    });

    let jetpackApi = new JetPackApi(httpClientMock);

    test('Test getJetPack return type', () => {
        return jetpackApi.getJetPack(jetpack_id).then(resp => {
            expect(resp).toBeInstanceOf(JetPack);
        });
    });
    test('Test getJetPack return id', () => {
        return jetpackApi.getJetPack(jetpack_id).then(resp => {
            expect(resp.id).toBe("77");
        });
    });
    test('Test getJetPack return name', () => {
        return jetpackApi.getJetPack(jetpack_id).then(resp => {
            expect(resp.name).toBe("The James Bond Jetpack");
        });
    });
    test('Test getJetPack return image', () => {
        return jetpackApi.getJetPack(jetpack_id).then(resp => {
            expect(resp.image).toBe("007picture.jpg");
        });
    });
    test('Test getJetPack call path', () => {
        return jetpackApi.getJetPack(jetpack_id).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks/' + jetpack_id);
        });
    });
});

describe('JetPackApi get JetPacks in range', function () {
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

    test('Test getJetPacksInRange return type', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(Array.isArray(resp)).toBe(true);
        });
    });
    test('Test getJetPacksInRange return length', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(resp.length).toBe(1);
        });
    });
    test('Test getJetPacksInRange return unit type', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(resp[0]).toBeInstanceOf(JetPack);
        });
    });
    test('Test getJetPacksInRange return unit jetpack id', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(resp[0].id).toBe("123");
        });
    });
    test('Test getJetPacksInRange return unit jetpack name', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(resp[0].name).toBe("The Jetpack");
        });
    });
    test('Test getJetPacksInRange return unit jetpack image', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
            expect(resp[0].image).toBe("base64 ...");
        });
    });
    test('Test getJetPacksInRange call path', () => {
        return jetpackApi.getJetPacksInRange(start, end).then(resp => {
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
    test('Test postJetPack call path', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks');
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
    test('Test editJetPack call path', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks/' + jetPackEntry.id);
        });
    });
    test('Test editJetPack call method', () => {
        return jetPackApi.editJetPack(jetPack).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("put");
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

        expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/jetpacks/' + jetPack.id);
        expect(httpClientMock.fetch.mock.calls[0][1].method).toStrictEqual("delete");
    });
});
