const BookingApi = require('./bookingApi');
const JetPack = require('../../Entity/Jetpack');
const Booking = require('../../Entity/Booking');

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

describe('JetPackApi post Bookings', function () {

    test('Test postJetPack', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        let jetPackEntry = {
            id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
            name: "big jet pack",
            image: "blurry.jpg"
        };
        let bookingEntry = {
            id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
            jet_pack_id: jetPackEntry.id,
            start_date: "2019-01-01",
            end_date: "2042-01-01"
        };
        httpClientMock.fetch.mockResolvedValue([
            bookingEntry
        ]);

        let bookingApi = new BookingApi(httpClientMock);
        let jetPack = new JetPack(jetPackEntry.name, jetPackEntry.image, jetPackEntry.id);
        let booking = new Booking(jetPack, bookingEntry.start_date, bookingEntry.end_date);

        bookingApi.postBooking(booking).then(resp => {
            expect(booking.id).toBe(bookingEntry.id);
            expect(httpClientMock.fetch.mock.calls[0][1].jet_pack_id).toBe(bookingEntry.jet_pack_id);
            expect(httpClientMock.fetch.mock.calls[0][1].start_date).toBe(bookingEntry.start_date);
            expect(httpClientMock.fetch.mock.calls[0][1].end_date).toBe(bookingEntry.end_date);
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("post");
        });
    });
});