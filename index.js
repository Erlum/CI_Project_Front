const appConfig = require('./app.config');
const JetPack = require('./src/Entity/Jetpack') ;
const Booking = require('./src/Entity/Booking') ;
const JetpackService = require('./src/Service/Api/JetpackApi');
const BookingService = require('./src/Service/Api/BookingApi');
const HttpClient = require('./src/HttpClient');
const httpClient = new HttpClient(appConfig.apiUrl);
const jetpackService = new JetpackService(httpClient);
const bookingService = new BookingService(httpClient) ;

/**** Display all jetpacks in index.html (definition below ***/
display_all_jetpacks_and_create_listeners()


/*** function to display all jetpacks ***/
function display_all_jetpacks_and_create_listeners() {
    jetpackService.getJetPacks().then(jetpacks => {
        let html_display_all_jetpacks =  '';
        jetpacks.forEach((jetpack) => {
            html_display_all_jetpacks +=
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

        document.getElementById('jetpacks').innerHTML = html_display_all_jetpacks ;

        /**** delete listener on each jetpack delete button class ****/
        let delete_jetpack_button = document.getElementsByClassName("delete_button_class");
        for(var i=0; i < delete_jetpack_button.length;i++){
            delete_jetpack_button[i].addEventListener('click',function() {
                getJetPackId(event);
            }, true);
        }

        /**** edit listener on each jetpack edit button class ****/
        let edit_jetpack_button = document.getElementsByClassName("edit_button_class");
        for(var i=0; i<edit_jetpack_button.length;i++){
            edit_jetpack_button[i].addEventListener('click',function() {
                getJetPackId(event);
                getInfosJetpackEdit(event)
            }, true);
        }
    });
}

/**** Reset jetpack filter list button ****/
var reset_jetpack_list_action_button = document.getElementById("reset_jetpack_filter") ;
reset_jetpack_list_action_button.onclick = function () {
    display_all_jetpacks_and_create_listeners()
}



/**** Display only avalaible jetpacks for selected range date ****/
var  check_jetpacks_action_button = document.getElementById("check_jetpack_availability");
check_jetpacks_action_button.onclick = function() {

    let booking_start_date = document.getElementById("booking_start_date").value;
    let booking_end_date = document.getElementById("booking_end_date").value;

    //console.log("debut : " + booking_start_date + "fin : " + booking_end_date)

    //include get avalaible method here
    jetpackService.getJetPacks().then(jetpacks => {
        let html_display_avalaible_jetpacks = '';
        jetpacks.forEach((jetpack) => {
            html_display_avalaible_jetpacks +=
                '<div class="col-lg-4 col-md-6 mb-4">' +
                '<div class="card h" style="width: 18rem;">\n' +
                '  <img src="' + jetpack.image + '" class="card-img-top" alt="...">\n' +
                '  <div class="card-body">\n' +
                '    <h4 class="card-title">' + jetpack.name + '</h4>\n' +
                '    <span id="jetpack-id" class="hidden">' + jetpack.id + '</span>' +
                '    <span class="start_date_booking_class hidden" >' + booking_start_date + '</span>' +
                '    <span class="end_date_booking_class hidden" >' + booking_end_date + '</span>' +
                '  </div>\n' +
                '     <div class="btn-group" role="group"">' +
                '           <button type="button" id="diplay_jetpack_booking_id/' + jetpack.id + '"class="btn btn-outline-success booking_button_class" data-toggle="modal" data-target="#booking_modal">Réserver</button>' +
                '    </div>' +
                '</div>' +
                '</div>'
        });

        document.getElementById('jetpacks').innerHTML = html_display_avalaible_jetpacks;

        /**** book listener on each jetpack booking button class ****/
        let book_jetpack_button = document.getElementsByClassName("booking_button_class");
        for (var i = 0; i < book_jetpack_button.length; i++) {
            book_jetpack_button[i].addEventListener('click', function () {

                getJetPackIdBooking(event)

            }, true);
        }
    });
}




/********************************* ADD **********************************/
var  add_jet_pack_action_button = document.getElementById("add_jetpack_button_id");
add_jet_pack_action_button.onclick = function() {
    // var nom = prompt("Please enter your name");
    //var url = prompt("Please enter your url");
    let name = document.getElementById("modal_add_jetpack_name").value;
    let image = document.getElementById("modal_add_jetpack_image").value;

    if(name != '' &&  image !=''){
        var jetpack_to_add = new Object();
        jetpack_to_add.name = name;
        jetpack_to_add.image = image;
        //console.log(jetPack)

        jetpackService.postJetPack(jetpack_to_add).then(function() {

            alert("Votre jetpack a bien été enregistré.");
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


/******************************** GET JETPACK ID for booking ***************************/
function getJetPackIdBooking(event){
    //console.log(event.target.id);
    let id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    document.getElementById("booking_jetpack_id").value = jetpack_id;
    //console.log("book jetpack id " + jetpack_id)
}


/********************************* DELETE **********************************/
var  delete_jetpack_action_button = document.getElementById("delete_jetpack_button");
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

    jetpackService.deleteJetPack(jetpack_to_delete).then(function() {

        alert("Votre jetpack a été supprimé.");
    });
};


/********************************* EDIT **********************************/
function getInfosJetpackEdit(event){
    //console.log(event.target.id);
    var id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    //console.log("edit jetpack id" + jetpack_id);

    jetpackService.getJetPack(jetpack_id).then(jetpack => {
        //console.log(jetpack);
        document.getElementById("modal_edit_jetpack_name").value = jetpack.name
        document.getElementById("modal_edit_jetpack_image").value = jetpack.image
        document.getElementById("edit_id_jetpack").value = jetpack.id;
    });
}

var  edit_jetpack_action_button = document.getElementById("edit_jetpack_button");
edit_jetpack_action_button.onclick = function() {

    jetpack_id = document.getElementById("edit_jetpack_id").value;

    var jetpack_to_edit = new Object()

    jetpackService.getJetPack(jetpack_id).then(jetpack => {
        //console.log(jetpack);
        jetpack_to_edit.name = jetpack.name ;
        jetpack_to_edit.image = jetpack.image ;
        jetpack_to_edit.id = jetpack.id ;
    });

    jetpackService.editJetPack(jetpack_to_edit).then(function() {

        alert("Votre jetpack a été modifié.");
    });
};


/********************************* BOOK **********************************/

var  booking_jetpack_action_button = document.getElementById("booking_jetpack_button");
booking_jetpack_action_button.onclick = function() {



};


