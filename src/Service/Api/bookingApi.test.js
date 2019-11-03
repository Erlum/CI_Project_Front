const BookingApi = require('./BookingApi');
const JetPack = require('../../Entity/Jetpack');
const Booking = require('../../Entity/Booking');

describe('BookingApi get Bookings', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    httpClientMock.fetch.mockResolvedValue([
        {
            idjetpack: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
            startdate: "2019-01-01",
            enddate: "2042-01-01"
        }
    ]);

    let bookingApi = new BookingApi(httpClientMock);

    test('Test getBookings return type', () => {
        return bookingApi.getBookings().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
        });
    });
    test('Test getBookings return length', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp.length).toBe(1);
        });
    });
    test('Test getBookings return unit type', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp[0]).toBeInstanceOf(Booking);
        });
    });
});

describe('BookingApi get JetPack Bookings', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    let jetpack_id = "a26574f0-3dd0-4e3b-9c1d-6089619f2f80";
    httpClientMock.fetch.mockResolvedValue([
        {
            idjetpack: jetpack_id,
            startdate: "2019-01-01",
            enddate: "2042-01-01"
        }
    ]);

    let bookingApi = new BookingApi(httpClientMock);

    test('Test getJetPackBookings return type', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(Array.isArray(resp)).toBe(true);
        });
    });
    test('Test getJetPackBookings return length', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp.length).toBe(1);
        });
    });
    test('Test getJetPackBookings return unit type', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp[0]).toBeInstanceOf(Booking);
        });
    });
    test('Test getJetPackBookings return unit jetpack id', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp[0].jetPack).toBe(jetpack_id);
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
            idjetpack: jetPackEntry.id,
            startdate: "2019-01-01",
            enddate: "2042-01-01"
        };
        httpClientMock.fetch.mockResolvedValue([
            bookingEntry
        ]);

        let bookingApi = new BookingApi(httpClientMock);
        let jetPack = new JetPack(jetPackEntry.name, jetPackEntry.image, jetPackEntry.id);
        let booking = new Booking(jetPack, bookingEntry.startdate, bookingEntry.enddate);

        bookingApi.postBooking(booking).then(resp => {
            expect(booking.id).toBe(bookingEntry.id);
            expect(httpClientMock.fetch.mock.calls[0][1].idjetpack).toBe(bookingEntry.idjetpack);
            expect(httpClientMock.fetch.mock.calls[0][1].startdate).toBe(bookingEntry.startdate);
            expect(httpClientMock.fetch.mock.calls[0][1].enddate).toBe(bookingEntry.enddate);
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("post");
        });
    });
});