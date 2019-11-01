const Booking = require('../../Entity/Booking');

module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getBookings() {
        return this.httpClient.fetch('/booking', {}).then(rows => {

            return rows.map(row => {
                return new Booking(row["jetpack"], row["start_date"], row["end_date"], row["id"]);
            });
        });
    }

    getJetPackBookings(JetPack) {
        return this.httpClient.fetch('/booking?jetpack=' + JetPack.id, {}).then(rows => {

            return rows.map(row => {
                return new Booking(row["jetpack"], row["start_date"], row["end_date"], row["id"]);
            });
        });
    }

    postBooking(booking) {
        return this.httpClient.fetch('/booking', {
            jetpack: booking.jetPack.id,
            start_date: booking.start,
            end_date: booking.end,
            method: "post"
        }).then(response => {
            booking.id = response.id;
        });
    }
};