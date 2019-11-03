const Jetpack = require('./Jetpack');

describe('Booking toJson', function () {
    let jetpack = new Jetpack("jetpack name", "image", "2222");
    let jetpack_empty_fields = new Jetpack("jetpack2 name");

    test('Test toJson all information', () => {
        expect(jetpack.toJson()).toMatchObject({
            id: "2222",
            name: "jetpack name",
            image: "image"
        });
    });
    test('Test toJson empty booking id', () => {
        expect(jetpack_empty_fields.toJson()).toMatchObject({
            id: null,
            name: "jetpack2 name",
            image: null
        });
    });
});