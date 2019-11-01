module.exports = class  {
    constructor(jetPack, start, end, id) {
        if (id === undefined){
            this._id = null;
        } else {
            this._id = id;
        }
        this._jetPack = jetPack;
        this._start = start;
        this._end = end;
    }

    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }

    get jetPack() {
        return this._jetPack;
    }
    set jetPack(value) {
        this._jetPack = value;
    }

    get start() {
        return this._start;
    }
    set start(value) {
        this._start = value;
    }

    get end() {
        return this._end;
    }
    set end(value) {
        this._end = value;
    }

    toJson() {
        return {
            id : this.id,
            start: this.start,
            end: this.end,
            jetPack: this.jetPack.toJson()
        }
    }
};