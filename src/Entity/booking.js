module.exports = class  {
    booking(jetPack, start, end) {
        if (jetPack === undefined){
            this._jetPack = null;
        } else {
            this._jetPack = jetPack;
        }
        if (start === undefined){
            this._start = null;
        } else {
            this._start = start;
        }
        if (end === undefined){
            this._end = null;
        } else {
            this._end = end;
        }
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
};