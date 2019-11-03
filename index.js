const appConfig = require('./app.config');
const JetPack = require('./src/Entity/Jetpack') ;
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');

const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingService = new BookingService(httpClient) ;

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
            '         <button type="button" id="displayeditJetpack/'+jetpack.id+'" class="btn btn-outline-primary edit_button" data-toggle="modal" data-target="#editModal"style="">Modifier</button>' ;

        html +=   ' <button type="button" id="bookJetpack/'+jetpack.id+'"class="btn btn-outline-success book_button" data-toggle="modal" data-target="#bookModal">Réserver</button>' ;


        html += '    </div>' +
            '    <div class="text-center">' +
            '           <button type="button" id="display_jetpack_delete_id/'+jetpack.id+'"class="btn btn-outline-danger mt-2 delete_button_class" data-toggle="modal" data-target="#delete_modal">Supprimer</button>' +
            '     </div>' +
            '  </div>\n' +
            '</div>' +
            '</div>'
    });

    document.getElementById('jetpacks').innerHTML = html;


    /**** delete listener on each jetpack delete button ****/
    var button_delete=document.getElementsByClassName("delete_button_class");

    for(var i=0; i<button_delete.length;i++){
        button_delete[i].addEventListener('click',function() {
            getJetPackId(event);

        }, true);
    }


});


/********************************* ADD **********************************/

var  add_jet_pack_action_button = document.getElementById("add_jetpack_button_id");

add_jet_pack_action_button.onclick = function() {
    // var nom = prompt("Please enter your name");
    //var url = prompt("Please enter your url");
    var name = document.getElementById("modal_jetpack_name_id").value;
    var image = document.getElementById("modal_jetpack_image_id").value;

    if(name != '' &&  image !=''){
        var jetPack = new JetPack();
        jetPack.name = name;
        jetPack.image = image;

        jetpackService.postJetPack(jetPack).then(function() {

            alert("Votre jetpack a été enregistré avec succès");
        });
    }
};


/********************************* DELETE **********************************/

function getJetPackId(event){
    //console.log(event.target.id);
    var id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    document.getElementById("delete_jetpack_id").value = jetpack_id;
    console.log("function getjetpackid " + jetpack_id)
}


var  delete_jetpack_action_button = document.getElementById("delete_jetpack_button_id");
delete_jetpack_action_button.onclick = function() {

    //alert("delete");
    jetpack_id = document.getElementById("delete_jetpack_id").value;
    console.log("delete button " + jetpack_id)
    deleteJetPack(jetpack_id);
};

function deleteJetPack(jetPackId) {
    console.log("function deleteJetPack " + jetPackId)
    jetpackService.deleteJetPack(jetpack_id);
}



