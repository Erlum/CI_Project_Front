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
            '<div class="card h-100" style="width: 18rem;">\n' +
            '  <img src="'+ jetpack.image +'" class="card-img-top" alt="...">\n' +
            '  <div class="card-body">\n' +
            '    <h4 class="card-title">' + jetpack.name + '</h4>\n' +
            '    <span id="jetpack-id" class="invisible">' + jetpack.id + '</span>' +
            '     <div class="d-flex justify-content-around">' +
            '         <button type="button" id="display_jetpack_edit_id/'+jetpack.id+'" class="btn btn-outline-primary edit_button_class" data-toggle="modal" data-target="#edit_modal"style="">Modifier</button>' ;

        html +=   ' <button type="button" id="diplay_jetpack_booking_id/'+jetpack.id+'"class="btn btn-outline-success booking_button_class" data-toggle="modal" data-target="#booking_modal">Réserver</button>' ;


        html += '    </div>' +
            '    <div class="text-center">' +
            '           <button type="button" id="display_jetpack_delete_id/'+jetpack.id+'"class="btn btn-outline-danger mt-2 delete_button_class" data-toggle="modal" data-target="#delete_modal">Supprimer</button>' +
            '     </div>' +
            '  </div>\n' +
            '</div>' +
            '</div>'
    });

    document.getElementById('jetpacks').innerHTML = html;


    /**** delete listener on each jetpack delete button class ****/
    var delete_button = document.getElementsByClassName("delete_button_class");

    for(var i=0; i< delete_button.length;i++){
        delete_button[i].addEventListener('click',function() {
            getJetPackId(event);

        }, true);
    }

    /**** edit listener on each jetpack edit button class ****/
    var edit_button = document.getElementsByClassName("edit_button_class");
    for(var i=0; i< edit_button.length;i++){

        edit_button[i].addEventListener('click',function() {
            getJetPackId(event);
            getInfosJetpackEdit(event)

        }, true);
    }

    /**** book listener on each jetpack booking button class ****/
    var button_addBook=document.getElementsByClassName("booking_button_class");

    for(var i=0; i<button_addBook.length;i++){
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
    var name = document.getElementById("modal_add_jetpack_name").value;
    var image = document.getElementById("modal_add_jetpack_image").value;

    if(name != '' &&  image !=''){
        var jetPack = new JetPack();
        jetPack.name = name;
        jetPack.image = image;

            //alert("Votre jetpack a été modifié avec succès")
        jetpackService.postJetPack(jetPack).then(function() {

            alert("Votre jetpack a été enregistré avec succès");
        });
    }
};


/******************************** GET JETPACK ID ***************************/

function getJetPackId(event){
    //console.log(event.target.id);
    var id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    document.getElementById("delete_jetpack_id").value = jetpack_id;
    //console.log("getjetpackid " + jetpack_id)
}


/********************************* DELETE **********************************/


var  delete_jetpack_action_button = document.getElementById("delete_jetpack_button_id");
delete_jetpack_action_button.onclick = function() {

    jetpack_id = document.getElementById("delete_jetpack_id").value;
    //console.log("delete button " + jetpack_id)
    deleteJetPack(jetpack_id);
};


function deleteJetPack(jetPackId) {
    //console.log("deleteJetPack " + jetPackId)
    jetpackService.deleteJetPack(jetpack_id);
}


/********************************* EDIT **********************************/

function getInfosJetpackEdit(event){

    //console.log(event.target.id);
    var id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    //console.log(jetpack_id);

    jetpackService.getJetPack(jetpack_id).then(jetpack => {
        //console.log(jetpack);
        document.getElementById("modal_edit_jetpack_name").value = jetpack[0].name;
        document.getElementById("modal_edit_jetpack_image").value = jetpack[0].image;
        document.getElementById("edit_jetpack_id").value = jetpack[0].id;
        //console.log(jetpack);
    });
}


var  edit_jetpack_action_button = document.getElementById("edit_jetpack_button_id");
edit_jetpack_action_button.onclick = function() {
    //console.log("edit");
    jetpack_id = document.getElementById("edit_jetpack_id").value;
    //console.log(jetpack_id)
        editJetPack(jetpack_id);
};


function editJetPack(jetPackId) {
    //console.log("function jetpack id " + jetPackId)
    var name = document.getElementById("modal_edit_jetpack_name").value;
    //console.log("name" + name)
    var image = document.getElementById("modal_edit_jetpack_image").value;
    //console.log("image" + image)
    var id = document.getElementById("edit_jetpack_id").value;
    //console.log("id" + id)

    //console.log("id after getElement" + id)
    if (name != '' && image != '') {
        // var jetPack = {};
        var jetPack = new jetPack();
        jetPack.name = name;
        jetPack.image = image;
        jetPack.id = id;

            //alert("Votre jetpack a été modifié avec succès");
        jetpackService.editJetPack(jetPack).then(function () {
            alert("Votre jetpack a été modifié avec succès");
        });
    }
}


/********************************* BOOK **********************************/

function getInfosJetpackBook(event){

    //console.log(event.target.id);
    var id_array = event.target.id.split("/");
    jetpack_id = id_array[1];
    //console.log("avant "+jetpack_id);

    jetpackService.getJetPack(jetpack_id).then(jetpack => {
        //console.log(jetpack);
        document.getElementById("booking_jetpack_id").value=jetpack[0].id;
        //console.log("apres "+jetpack[0].id);
    });
}


var  check_book_jetpack_action_button = document.getElementById("check_book_jetpack");
check_book_jetpack_action_button.onclick = function() {

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var jetpack_id = document.getElementById("booking_jetpack_id").value;

    if(startDate != '' &&  endDate!=''){

        bookingService.getBookingsByIdJetpack(jetpack_id,startDate,endDate).then(bookings => {
            bookings.length = 0; // test

            if (bookings.length > 0) {
                alert("Les dates choisies ne sont pas disponibles")
            }else{
                alert("Les dates choisies sont disponibles")
            }
        });
    }
};


var  book_jetpack_action_button = document.getElementById("booking_jetpack_button_id");
book_jetpack_action_button.onclick = function() {

    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var jetpack_id = document.getElementById("booking_jetpack_id").value;

    if(startDate != '' &&  endDate!=''){

        var booking = new Booking();
        booking.startDate = startDate ;
        booking.endDate = endDate ;
        booking.jetPack_id = jetpack_id ;

        //console.log(booking)
        bookingService.postBooking(booking).then(function () {

            alert("Votre réservation a été effectué avec succès");

        });
    }
};