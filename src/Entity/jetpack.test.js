const Jetpack = require('./Jetpack');

describe('jetpack toJson', function () {
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

describe('jetpack toCard', function () {
    let jetpack = new Jetpack("jetpack name", "image", "2222");

    test('jetpack toCard', () => {
        expect(jetpack.toCard()).toMatch(/<button type="button" id="display_jetpack_delete_id/);
        expect(jetpack.toCard(true)).not.toMatch(/<button type="button" id="display_jetpack_delete_id/);
        expect(jetpack.toCard()).not.toMatch(/<button type="button" id="diplay_jetpack_booking_id/);
        expect(jetpack.toCard(true)).toMatch(/<button type="button" id="diplay_jetpack_booking_id/);
    });
});