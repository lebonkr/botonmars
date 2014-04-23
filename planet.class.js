// Constant - public
MAX_PLANET_SIZE = 50;

// Constructor
function Planet(x, y) {
  this.x = x;	// x size of planet
  this.y = y;	// y size of planet
  this.flag = new Array();
  for (var i=0; i<=x; i++) {
	  this.flag[i] = new Array();
	  for (var j=0; j<=y; j++) {
		  this.flag[i][j] = [];	// last flag of previous bot
	  }
  }
}
// class methods
Planet.prototype.setlocation = function(x, y) {
	// return value
	// true : normal
	// false : fall
	if ((this.x < x) || (this.y < y) || (0 > y) || (0 > x)) return false;
	return true;
};

Planet.prototype.getflag = function(x, y) {
	// return value
	// true : normal
	// false : flag found

	return this.flag[x][y];
}

Planet.prototype.setflag = function(x, y, dir) { // set flag at some point
	// return value : none
	if ((this.x < x) || (this.y < y) || (0 > y) || (0 > x)) return;
	if (this.flag[x][y].indexOf(dir) < 0) this.flag[x][y].push(dir);
}

// export the class
module.exports = Planet;
