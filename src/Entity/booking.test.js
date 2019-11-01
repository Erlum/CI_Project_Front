const JetPack = require('./Jetpack');
const Booking = require('./Booking');

describe('Booking toJson', function () {

    test('Test toJson', () => {
        let booking = new Booking(new JetPack("big jet pack", "blurry.jpg", "987"),
            "12-12-2019", "25-12-2019", "123");
        let booking_empty_fields = new Booking(new JetPack("big jet pack"),
            "12-12-2019", "25-12-2019");
        expect(booking.toJson()).toMatchObject({
            id: "123",
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: {
                id: "987",
                name: "big jet pack",
                image: "blurry.jpg"
            }
        });
        expect(booking_empty_fields.toJson()).toMatchObject({
            id: null,
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: {
                name: "big jet pack",
                image: null,
                id: null,
            }
        });
    });
});