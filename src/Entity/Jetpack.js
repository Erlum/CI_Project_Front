module.exports = class  {
    constructor(name, image, id) {
        if (id === undefined){
            this._id = null;
        } else {
            this._id = id;
        }
        if (name === undefined){
            this._name = null;
        } else {
            this._name = name;
        }
        if (image === undefined){
            this._image = null;
        } else {
            this._image = image;
        }
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
};