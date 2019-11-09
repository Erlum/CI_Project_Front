const Booking = require('./Booking');

describe('Booking toJson', function () {
    let booking = new Booking("987", "12-12-2019", "25-12-2019", "123");
    let booking_no_booking_id = new Booking("987", "12-12-2019", "25-12-2019");

    test('Test toJson all information', () => {
        expect(booking.toJson()).toMatchObject({
            id: "123",
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: "987"
        });
    });
    test('Test toJson empty booking id', () => {
        expect(booking_no_booking_id.toJson()).toMatchObject({
            id: null,
            start: "12-12-2019",
            end: "25-12-2019",
            jetPack: "987"
        });
    });
});