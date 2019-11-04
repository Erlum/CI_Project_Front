const appConfig = require('./app.config');
const JetPack = require('./src/Entity/Jetpack') ;
const Booking = require('./src/Entity/Booking') ;
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
            '<div class="card h" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h4 class="card-title">' + jetpack.name + '</h4>\n' +
            '    <span id="jetpack-id" class="invisible">' + jetpack.id + '</span>' +

            '  </div>\n' +
            '     <div class="btn-group" role="group"">' +
            //'         <button type="button" id="display_jetpack_view_id/'+jetpack.id+'" class="btn btn-outline-primary edit_button_class" data-toggle="modal" data-target="#view_modal"style="">Voir</button>' +
            '         <button type="button" id="display_jetpack_edit_id/'+jetpack.id+'" class="btn btn-outline-primary edit_button_class dual-btn-equal-width" data-toggle="modal" data-target="#edit_modal"style="">Modifier</button>' +
            //'         <button type="button" id="diplay_jetpack_booking_id/'+jetpack.id+'"class="btn btn-outline-success booking_button_class" data-toggle="modal" data-target="#booking_modal">Réserver</button>' +
            '         <button type="button" id="display_jetpack_delete_id/'+jetpack.id+'"class="btn btn-outline-danger delete_button_class dual-btn-equal-width" data-toggle="modal" data-target="#delete_modal">Supprimer</button>' +
            '    </div>' +
            '</div>' +
            '</div>'
    });

    document.getElementById('jetpacks').innerHTML = html;


    /**** delete listener on each jetpack delete button class ****/
    let delete_button = document.getElementsByClassName("delete_button_class");

    for(var i=0; i < delete_button.length;i++){
        delete_button[i].addEventListener('click',function() {
            getJetPackId(event);
        }, true);
    }

    /**** edit listener on each jetpack edit button class ****/
    let edit_button = document.getElementsByClassName("edit_button_class");
    for(var i=0; i<edit_button.length;i++){

        edit_button[i].addEventListener('click',function() {
            getJetPackId(event);
            getInfosJetpackEdit(event)

        }, true);
    }

    /**** book listener on each jetpack booking button class ****/
    let button_addBook=document.getElementsByClassName("booking_button_class");

    for(var i=0; i < button_addBook.length;i++){
        button_addBook[i].addEventListener('click',function() {

            getInfosJetpackBook(event);

        }, true);
    }
});


/********************************* ADD **********************************/

var  add_jet_pack_action_button = document.getElementById("add_jetpack_button_id");

add_jet_pack_action_button.onclick = function() {
    // var nom = prompt("Please enter your name");
    //var url = prompt("Please enter your url");
    let name = document.getElementById("modal_add_jetpack_name").value;
    let image = document.getElementById("modal_add_jetpack_image").value;

    if(name != '' &&  image !=''){
        var jetPack = new Object();
        jetPack.name = name;
        jetPack.image = image;
        //console.log(jetPack)

        jetpackService.postJetPack(jetPack).then(function() {

            alert("Votre jetpack a été enregistré avec succès");
        });
    }
};


/******************************** GET JETPACK ID ***************************/

function getJetPackId(event){
    //console.log(event.target.id);
    let id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    document.getElementById("delete_jetpack_id").value = jetpack_id;
    //console.log("getjetpackid " + jetpack_id)
}


/********************************* DELETE **********************************/


var  delete_jetpack_action_button = document.getElementById("delete_jetpack_button_id");
delete_jetpack_action_button.onclick = function() {

    jetpack_id = document.getElementById("delete_jetpack_id").value;
    //console.log("delete button " + jetpack_id)

    var jetpack_to_delete = new Object()

    jetpackService.getJetPack(jetpack_id).then(jetpack => {
        //console.log(jetpack);
        jetpack_to_delete.name = jetpack.name ;
        jetpack_to_delete.image = jetpack.image ;
        jetpack_to_delete.id = jetpack.id ;
    });

    deleteJetPack(jetpack_to_delete);
};




