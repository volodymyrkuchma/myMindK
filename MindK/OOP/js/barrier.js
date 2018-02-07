function Barrier() {
    var left;
    var affect;
    var image;

    this.getAffect = function() {
        return affect;
    }
    this.setAffect = function (value) {
        affect = value;
    }
    this.getLeft = function () {
        return left;
    }
    this.setLeft = function (value) {
        left = value;
    }
    this.getImage = function () {
        return image;
    }
    this.setImage = function (value) {
        image = value;
    }
}

Barrier.prototype.init = function () {
    //random generate affect
    var affect = Math.floor(Math.random() * 6) - 3;
    if (affect === 0) {
        affect = 1;
    }
    this.setAffect(affect);
    if (affect > 0) {
        this.setImage('yagoda');
    }
    else {
        this.setImage('kamen');
    }
    //set image in depend of + or - affect
}
Barrier.prototype.destroy = function () {
    //todo
}