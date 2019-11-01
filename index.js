const appConfig = require('./app.config');
const Booking = require('./src/Entity/Booking');
const JetPack = require('./src/Entity/Jetpack');
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingService = new BookingService(httpClient);

let make_jetpack_block = function (jetpack) {
    return '<div class="col-lg-4 col-md-6 mb-4">\n' +
        '    <div class="card h-100" id="jetpack-' + jetpack.id + '">\n' +
        '        <img src="' + jetpack.image + '" class="card-img-top" alt="...">\n' +
        '        <div class="card-body">\n' +
        '            <h4 class="card-title">' + jetpack.name + '</h4>\n' +
        '            <div class="d-flex justify-content-between flex-wrap">\n' +
        '                <button type="button" id="edit-jetpack" class="btn btn-outline-primary m" data-toggle="modal" data-target="#edit-jetpack-modal" data-id="' + jetpack.id + '">Modifier</button>\n' +
        '                <button type="button" id="book-jetpack" class="btn btn-outline-success" data-toggle="modal" data-target="#book-jetpack-modal" data-id="' + jetpack.id + '">Réserver</button>\n' +
        '                <button type="button" id="delete-jetpack" class="btn btn-outline-danger" data-toggle="modal" data-target="#delete-jetpack-modal" data-id="' + jetpack.id + '">Supprimer</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>\n';
};

// Load data
let jetpacks_array = {};
jetpackService.getJetPacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        jetpacks_array[jetpack.id] = jetpack;
        html += make_jetpack_block(jetpack);
    });

    $('#jetpacks').html(html);
});

/**
 * Clean data from a form
 * @param data_raw list: [{name: "...", value: "..."}]
 */
let clean_form_data = function(data_raw){
    let data = {};
    for (let i = 0; i < data_raw.length; i++) {
        data[data_raw[i]["name"]] = data_raw[i]["value"]
    }
    return data;
};

// DOM Ready
$(function(){
    // DateRangePicker initialisation
    moment.locale('fr');

    // Modal open listeners
    $('#edit-jetpack-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let jetpack = jetpacks_array[button.data('id')];
        let modal = $(this);
        modal.find('input#jetpack-edit-id').val(jetpack.id);
        modal.find('input#jetpack-edit-name').val(jetpack.name);
        modal.find('input#jetpack-edit-image').val(jetpack.image);
    });

    $('#book-jetpack-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let jetpack = jetpacks_array[button.data('id')];
        let modal = $(this);

        bookingService.getJetPackBookings(jetpack).then(bookings => {
            modal.find('input.date-range').daterangepicker({
                minDate: moment(),
                autoApply: true,
                opens: "center",
                isInvalidDate: function (date) {
                    for (let i = 0; i < bookings.length; i++) {
                        if (date >= moment(bookings[i].start, moment.ISO_8601) && date <= moment(bookings[i].end, moment.ISO_8601)){
                            return true
                        }
                    }
                    return false;
                },
            }, function(start, end, label) {
                for (let i = 0; i < bookings.length; i++) {
                    if (start < moment(bookings[i].start, moment.ISO_8601) && end > moment(bookings[i].end, moment.ISO_8601)){
                        this.startDate = moment();
                        this.endDate = moment();
                        $('#book-interval-invalid-modal').modal('show');
                        return;
                    }
                }
            });
        });

        modal.find('span#jetpack-book-name').html(jetpack.name);
        modal.find('input#jetpack-book-id').val(jetpack.id);
    });

    $('#delete-jetpack-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let jetpack = jetpacks_array[button.data('id')];
        let modal = $(this);
        modal.find('span#jetpack-delete-name').html(jetpack.name);
        modal.find('input#jetpack-delete-id').val(jetpack.id);
    });
    
    // Form submit listeners
    $('#create-jetpack-modal form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        let data = clean_form_data(form.serializeArray());
        let jetPack = new JetPack(data["jetpack-name"], data["jetpack-image"]);
        jetpackService.postJetPack(jetPack).then(function () {
            $('#jetpacks').append(make_jetpack_block(jetPack));
            $('#create-jetpack-modal').modal('hide');
        });
    });

    $('#edit-jetpack-modal form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        let data = clean_form_data(form.serializeArray());
        let jetPack = jetpacks_array[data["jetpack-id"]];
        jetPack.name = data["jetpack-name"];
        jetPack.image = data["jetpack-image"];
        jetpackService.editJetPack(jetPack).then();
    });

    $('#book-jetpack-modal form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        let data = clean_form_data(form.serializeArray());
        let jetPack = jetpacks_array[data["jetpack-id"]];
        let start = $(this).find('#date-range').data('daterangepicker').startDate;
        let end = $(this).find('#date-range').data('daterangepicker').endDate;
        let booking = new Booking(jetPack.id, start, end);
        bookingService.postBooking(booking);
    });

    $('#delete-jetpack-modal form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        let data = clean_form_data(form.serializeArray());
        let jetPack = jetpacks_array[data["jetpack-id"]];
        jetpackService.deleteJetPack(jetPack);
    });
});
