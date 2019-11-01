const Booking = require('./Booking');

describe('Booking toJson', function () {

    test('Test toJson', () => {
        let booking = new Booking("987", "12-12-2019", "25-12-2019", "123");
        let booking_no_id = new Booking("987", "12-12-2019", "25-12-2019");
        expect(booking.toJson()).toMatchObject({
            id: "123",
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: "987"
        });
        expect(booking_no_id.toJson()).toMatchObject({
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: "987"
        });
    });
});