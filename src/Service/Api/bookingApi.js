const JetPack = require('../../Entity/Jetpack');
const Booking = require('../../Entity/booking');

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
};