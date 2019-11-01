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
            '         <button type="button" id="book-jetpack" class="btn btn-outline-success" data-toggle="modal" data-target="#book-jetpack-modal">Réserver</button>' +
            '    </div>' +
            '    <div class="text-center">' +
            '           <button type="button" id="delete-jetpack" class="btn btn-outline-danger mt-2" data-toggle="modal" data-target="#delete-jetpack-modal">Supprimer</button>' +
            '     </div>' +
            '  </div>\n' +
            '</div>' +
            '</div>'

    });

    document.getElementById('jetpacks').innerHTML = html;
});

// DOM Ready
$(function(){
    $('#edit-jetpack-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget);
        let jetpack = jetpacks_array[button.data('id')];
        let modal = $(this);
        modal.find('input.jetpack-name').text(jetpack.name);
        modal.find('input.jetpack-image').val(jetpack.image);
    })
});
