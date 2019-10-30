const appConfig = require('./app.config');
const JetpackService = require('./src/Service/Api/JetpackApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);


jetpackService.getJetPacks().then(jetpacks => {
    let html =  '';
    jetpacks.forEach((jetpack) => {
        html +=
            '<div class="col-lg-4 col-md-6 mb-4">' +
            '<div class="card h-100" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h4 class="card-title">' + jetpack.name + '</h4>\n' +
            '    <span id="jetpack-id" class="invisible">' + jetpack.id + '</span>' +
            '     <div class="d-flex justify-content-around">' +
            '         <button type="button" id="modifier-jetpack" class="btn btn-outline-primary m" data-toggle="modal" data-target="#modifierModal"style="">Modifier</button>' +
            '         <button type="button" id="reserver-jetpack"class="btn btn-outline-success" data-toggle="modal" data-target="#reserverModal">Réserver</button>' +
            '    </div>' +
            '     <button type="button" id="reserver-jetpack"class="btn btn-outline-danger mt-2" data-toggle="modal" data-target="#supprimerModal">Supprimer</button>' +
            '  </div>\n' +
            '</div>' +
            '</div>'

    });


    document.getElementById('jetpacks').innerHTML = html;
});