const Booking = require('../../Entity/Booking');

module.exports = class  {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getBookings() {
        return this.httpClient.fetch('/bookings', {}).then(rows => {
            return rows.map(row => {
                return new Booking(row["idjetpack"], row["startdate"], row["enddate"], row["id"]);
            });
        });
    }

    getJetPackBookings(JetPack) {
        return this.httpClient.fetch('/bookings?jetpack=' + JetPack.id, {}).then(rows => {
            return rows.map(row => {
                return new Booking(row["idjetpack"], row["startdate"], row["enddate"], row["id"]);
            });
        });
    }

    postBooking(booking) {
        return this.httpClient.fetch('/bookings', {
            method: "post",
            body: JSON.stringify({
                "idjetpack": booking.jetPack.id,
                "startdate": booking.start,
                "enddate": booking.end,
            })
        }).then(response => {
            booking.id = response.id;
        });
    }
};