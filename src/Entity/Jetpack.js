module.exports = class  {
    constructor(name, image, id) {
        if (id === undefined){
            this._id = null;
        } else {
            this._id = id;
        }
        if (image === undefined){
            this._image = null;
        } else {
            this._image = image;
        }
        this._name = name;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    toJson() {
        return {
            id : this.id,
            name: this.name,
            image: this.image
        }
    }

    toCard(show_book_button=false){
        return '' +
        '<div class="col-lg-4 col-md-6 mb-4">' +
        '    <div class="card h box zoom">\n' +
        '        <img src="' + this.image + '" class="card-img-top" alt="...">\n' +
        '        <div class="card-body">\n' +
        '            <h4 class="card-title">' + this.name + '</h4>\n' +
        '            <span id="jetpack-id" class="hide">' + this.id + '</span>' +
        '        </div>\n' +
        '        <div class="btn-group" role="group"">' +
            (show_book_button ?
        '            <button type="button" id="diplay_jetpack_booking_id/' + this.id + '"class="btn btn-outline-success booking_button_class" data-toggle="modal" data-target="#booking_modal"><i class="fas fa-calendar-alt"></i></button>' : (
        '            <button type="button" id="display_jetpack_edit_id/' + this.id + '" class="btn btn-outline-primary edit_button_class dual-btn-equal-width" data-toggle="modal" data-target="#edit_modal"><i class="fas fa-edit"></i></button>' +
        '            <button type="button" id="display_jetpack_delete_id/' + this.id + '"class="btn btn-outline-danger delete_button_class dual-btn-equal-width" data-toggle="modal" data-target="#delete_modal"><i class="fas fa-trash"></i></button>')) +
        '        </div>' +
        '    </div>' +
        '</div>'
    }
};