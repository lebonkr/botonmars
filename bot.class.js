// Constant - public
DIR_STR = ['E','S','W','N'];

// Constant - private
var DIR_XY = [{x:1,y:0}, {x:0,y:-1}, {x:-1,y:0}, {x:0,y:1}];

// Constructor
function Bot(x, y, dir, planet) {
  this.x = Number(x);
  this.y = Number(y);
  this.dir = DIR_STR.indexOf(dir);
  this.planet = planet;
  this.status = this.planet.setlocation(this.x, this.y);
}

// class methods
Bot.prototype.move = function(command) {
	if (!this.status) return;	// if bot has been fallen, no command allowed.

	switch (command) {
	case 'L' :
		this.dir = (this.dir + 3) % 4;
		break;
	case 'R' :
		this.dir = (this.dir + 1) % 4;
		break;	
	case 'F' :
		var flag = this.planet.getflag(this.x, this.y);
		if (flag.indexOf(this.dir) > -1) { // flag found. command should be ignored.
		}
		else {
			var prevx = this.x; // save last position
			var prevy = this.y;

			this.x += DIR_XY[this.dir].x;	// blind forawding
			this.y += DIR_XY[this.dir].y;
			if (!this.planet.setlocation(this.x, this.y)) { // is it good to move?
				// fall
				this.planet.setflag(prevx, prevy, this.dir); // leave flag at last position
				this.status = false;
			}
		}
		break;	
	}
	return this.status;
};

Bot.prototype.getposition = function() {
	return this.x.toString()+' '+this.y.toString()+' '+DIR_STR[this.dir];
};

Bot.prototype.getstatus = function() {
	return this.status;
};

// export the class
module.exports = Bot;
