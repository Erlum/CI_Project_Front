const Jetpack = require('./Jetpack');

describe('Booking toJson', function () {
    let jetpack = new Jetpack("jetpack name", "image", "2222");
    let jetpack_no_booking_id = new Jetpack("jetpack2 name", "image");

    test('Test toJson all information', () => {
        expect(jetpack.toJson()).toMatchObject({
            id: "2222",
            name: "jetpack name",
            image: "image"
        });
    });
    test('Test toJson empty booking id', () => {
        expect(jetpack_no_booking_id.toJson()).toMatchObject({
            id: null,
            name: "jetpack2 name",
            image: "image"
        });
    });
});