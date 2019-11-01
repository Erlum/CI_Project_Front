const appConfig = require('./app.config');
const JetPack = require('./src/Entity/Jetpack') ;
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
            '         <button type="button" id="editJetpack" class="btn btn-outline-primary m" data-toggle="modal" data-target="#editModal"style="">Modifier</button>' +
            '         <button type="button" id="bookJetpack"class="btn btn-outline-success" data-toggle="modal" data-target="#bookModal">Réserver</button>' +
            '    </div>' +
            '    <div class="text-center">' +
            '           <button type="button" id="deleteJetpack"class="btn btn-outline-danger mt-2" data-toggle="modal" data-target="#deleteModal">Supprimer</button>' +
            '     </div>' +
            '  </div>\n' +
            '</div>' +
            '</div>'

    });


    document.getElementById('jetpacks').innerHTML = html;
});




var  addJetPackButton = document.getElementById("addJetPackButton");

addJetPackButton.onclick = function() {

    // var nom = prompt("Please enter your name");

    //var url = prompt("Please enter your url");

    var name = document.getElementById("jetpackName").value;

    var image = document.getElementById("jetpackImage").value;

    if(name != '' &&  image != ''){

        var jetPack = new JetPack();

        jetPack.name = name;

        jetPack.image = image;

        jetpackService.postJetPack(jetPack).then(function() {

            alert("Le jetpack a été enregistré avec succès");

        });
    }
};
