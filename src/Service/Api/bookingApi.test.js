const BookingApi = require('./BookingApi');
const JetPack = require('../../Entity/Jetpack');
const Booking = require('../../Entity/Booking');

describe('BookingApi get Bookings', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    let bookingEntry = {
        id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
        idjetpack: "a26574f0-3dd0-4e3b-9c1d-6089619f2f800",
        startdate: "2019-01-01",
        enddate: "2042-01-01"
    };
    httpClientMock.fetch.mockResolvedValue([
        bookingEntry
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
    test('Test getJetPackBookings return unit id', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp[0].id).toBe(bookingEntry.id);
        });
    });
    test('Test getJetPackBookings return unit start date', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp[0].start).toBe(bookingEntry.startdate);
        });
    });
    test('Test getJetPackBookings return unit end date', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp[0].end).toBe(bookingEntry.enddate);
        });
    });
    test('Test getJetPackBookings return unit end date', () => {
        return bookingApi.getBookings().then(resp => {
            expect(resp[0].jetPack).toBe(bookingEntry.idjetpack);
        });
    });
    test('Test getJetPackBookings call', () => {
        return bookingApi.getBookings().then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/bookings');
        });
    });
});

describe('BookingApi get JetPack Bookings', function () {
    let httpClientMock = {
        fetch: jest.fn()
    };

    let jetpack_id = "a26574f0-3dd0-4e3b-9c1d-6089619f2f800";
    let bookingEntry = {
        id: "a26574f0-3dd0-4e3b-9c1d-6089619f2f80",
        idjetpack: jetpack_id,
        startdate: "2019-01-01",
        enddate: "2042-01-01"
    };
    httpClientMock.fetch.mockResolvedValue([
        bookingEntry
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
    test('Test getJetPackBookings return unit id', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp[0].id).toBe(bookingEntry.id);
        });
    });
    test('Test getJetPackBookings return unit start date', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp[0].start).toBe(bookingEntry.startdate);
        });
    });
    test('Test getJetPackBookings return unit end date', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(resp[0].end).toBe(bookingEntry.enddate);
        });
    });
    test('Test getJetPackBookings call', () => {
        return bookingApi.getJetPackBookings(new JetPack("", "", jetpack_id)).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/bookings?jetpack=' + jetpack_id);
        });
    });
});

describe('JetPackApi post Bookings', function () {
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
    httpClientMock.fetch.mockResolvedValue(bookingEntry);

    let bookingApi = new BookingApi(httpClientMock);
    let jetPack = new JetPack(jetPackEntry.name, jetPackEntry.image, jetPackEntry.id);
    let booking = new Booking(jetPack.id, bookingEntry.startdate, bookingEntry.enddate);

    test('Test postJetPack booking id', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(booking.id).toBe(bookingEntry.id);
        });
    });
    test('Test postJetPack call jetpack', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).idjetpack).toBe(bookingEntry.idjetpack);
        });
    });
    test('Test postJetPack call startdate', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).startdate).toBe(bookingEntry.startdate);
        });
    });
    test('Test postJetPack call enddate', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(JSON.parse(httpClientMock.fetch.mock.calls[0][1].body).enddate).toBe(bookingEntry.enddate);
        });
    });
    test('Test postJetPack call', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][0]).toBe('/bookings');
        });
    });
    test('Test postJetPack call method', () => {
        return bookingApi.postBooking(booking).then(resp => {
            expect(httpClientMock.fetch.mock.calls[0][1].method).toBe("post");
        });
    });
});