const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingService = new BookingService(httpClient);

// Load data
let jetpacks_array = {};
jetpackService.getJetPacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        jetpacks_array[jetpack.id] = jetpack;
        html +=
            '<div class="col-lg-4 col-md-6 mb-4">' +
            '<div class="card h-100" id="jetpack-' + jetpack.id + '" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h4 class="card-title">' + jetpack.name + '</h4>\n' +
            '     <div class="d-flex justify-content-around">' +
            '         <button type="button" id="edit-jetpack" class="btn btn-outline-primary m" data-toggle="modal" data-target="#edit-jetpack-modal" data-id="' + jetpack.id + '">Modifier</button>' +
            '         <button type="button" id="book-jetpack" class="btn btn-outline-success" data-toggle="modal" data-target="#book-jetpack-modal" data-id="' + jetpack.id + '">Réserver</button>' +
            '    </div>' +
            '    <div class="text-center">' +
            '           <button type="button" id="delete-jetpack" class="btn btn-outline-danger mt-2" data-toggle="modal" data-target="#delete-jetpack-modal" data-id="' + jetpack.id + '">Supprimer</button>' +
            '     </div>' +
            '  </div>\n' +
            '</div>' +
            '</div>'

    });

    document.getElementById('jetpacks').innerHTML = html;
});

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
    $('#edit-jetpack-modal form').submit(function (event) {
        event.preventDefault();
        let form = $(this);
        let data_raw = form.serializeArray();
        let data = {};
        for (let i = 0; i < data_raw.length; i++) {
            data[data_raw[i]["name"]] = data_raw[i]["value"]
        }
        jetPack = jetpacks_array[data["jetpack-id"]];
        jetPack.name = data["jetpack-name"];
        jetPack.image = data["jetpack-image"];
        jetpackService.editJetPack(jetPack);
    })
});
