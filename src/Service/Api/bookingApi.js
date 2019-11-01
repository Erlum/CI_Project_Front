const Booking = require('../../Entity/Booking');

module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getBookings() {
        return this.httpClient.fetch('/bookings', {}).then(rows => {

            return rows.map(row => {
                return new Booking(row["jetpack"], row["start_date"], row["end_date"]);
            });
        });
    }

    postBooking(booking) {
        return this.httpClient.fetch('/jetpacks', {
            jet_pack_id: booking.jetPack.id,
            start_date: booking.start,
            end_date: booking.end,
            method: "post"
        }).then(response => {
            booking.id = response[0].id;
        });
    }
};