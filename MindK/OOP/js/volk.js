function Volk() {
    Runner.call(this);

    this.setImage('volk');

    this.setSpeed(Volk.SPEED);
}

Volk.SPEED = 3;

Volk.prototype = Object.create(Runner);
Volk.prototype.constructor = Volk;