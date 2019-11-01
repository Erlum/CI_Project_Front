// This file contains the readable source for the decorate tags.

// Get jetpack booking.
((config, response) => {
    let pad = function (number) {
        return (number < 10) ? '0' + number : number.toString();
    };
    let iso8601 = function (date) {
        return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    };
    let now = new Date();
    let next_week = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);
    let week_after = new Date(next_week.getFullYear(), next_week.getMonth(), next_week.getDate()+7);

    response.body = JSON.stringify(response.body);
    response.body = response.body.replace('${NEXT_WEEK}', iso8601(next_week));
    response.body = response.body.replace('${WEEK_AFTER}', iso8601(week_after));

    return {
        body: JSON.parse(response.body),
        statusCode: response.statusCode,
        headers: response.headers
    };
})(config, response);