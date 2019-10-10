const BookingApi = require('./bookingApi');
const JetPack = require('../../Entity/Jetpack');
const Booking = require('../../Entity/booking');

describe('BookingApi get Bookings', function () {

    test('Test getBookings', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                jetpack: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
                start_date: "2019-01-01",
                end_date: "2042-01-01"
            }
        ]);

        let bookingApi = new BookingApi(httpClientMock);
        bookingApi.getBookings().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Booking)
        });
    });
});