// include
var Planet = require('./planet.class.js');
var Bot = require('./bot.class.js');

// Constructor
function Commander() {
  this.input = "";	// input string
  this.planet_condition = {x:0,y:0};	// planet variable
  this.bot_commands = [];	// bot command variable
  this.bots_result = [];	// result array
  this.error = "";	// error string
  this.mars = null;	// planet mars init
}

Commander.prototype.setcommand = function(command) {
	// get input string and parse them to member variables
	this.input = command;

	// check validity of input command
	var commandlist = this.input.split('\n');

	if (commandlist.length < 1) {
		this.error = "Input error : no valid input string";
		return false;
	}

	var linenum = 0;
	// 1st command should be planet initialization
	var cur_command = commandlist[linenum].replace(/(^\s*)|(\s*$)/gi, "").split(' ');

	// input format check
	if ((cur_command.length != 2) || isNaN(cur_command[0]) || isNaN(cur_command[1])){
		this.error = "Input error : wrong format at Line "+(linenum+1)+" ["+commandlist[linenum]+"]";
		return false;
	}
	else if ((cur_command[0] > MAX_PLANET_SIZE) || (cur_command[1] > MAX_PLANET_SIZE)) {
		this.error = "Input error : planet size exceed max value at Line "+linenum+" ["+commandlist[linenum]+"]";
		return false;
	}
	this.planet_condition.x = cur_command[0];
	this.planet_condition.y = cur_command[1];

	linenum++;
	var one_command;

	while (linenum<commandlist.length) {
		one_command = {x:0,y:0,dir:"",path:[]};
		cur_command = commandlist[linenum].replace(/(^\s*)|(\s*$)/gi, "").split(' ');

		// input format check
		if ((cur_command.length != 3) || 
			isNaN(cur_command[0]) || 
			isNaN(cur_command[1]) || 
			(DIR_STR.indexOf(cur_command[2]) < 0)){
			this.error = "Input error : wrong format at Line "+(linenum+1)+" ["+commandlist[linenum]+"]";
			return false;
		}
		one_command.x = cur_command[0]; 
		one_command.y = cur_command[1];
		one_command.dir = cur_command[2];

		linenum++;
		if (linenum>=commandlist.length) {
			this.error = "Input error : not enough movement command at Line "+(linenum+1);
			return false;
		}

		one_command.path = commandlist[linenum].split('');
		if (one_command.path.length > 100) {
			this.error = "Input error : count of movement command cannot over 100 at Line "+(linenum+1);
			return false;
		}

		this.bot_commands.push(one_command);
		linenum++;
	}
	return true;

}

Commander.prototype.docommand = function() {
	if (this.error != "") return;	// meaningless if error has been found.

	this.mars = new Planet(this.planet_condition.x, this.planet_condition.y);

	var bot = null;
	var curbot_result = "";

	for (var curbot=0; curbot<this.bot_commands.length; curbot++) {
		// create bot object
		bot = new Bot(this.bot_commands[curbot].x, this.bot_commands[curbot].y, this.bot_commands[curbot].dir, this.mars);

		curbot_result = bot.getposition();

		for (var curcomm=0; curcomm<this.bot_commands[curbot].path.length; curcomm++) {
			if (bot.move(this.bot_commands[curbot].path[curcomm])) {
				curbot_result = bot.getposition();	// save last position of bot
			}
			else {
				curbot_result += " LOST";
				break;
			}
		}
		this.bots_result.push(curbot_result);
		delete bot;
	}
}

Commander.prototype.getresult = function() {
	if (this.error) return this.error;
	return this.bots_result.join('\n');
}

// export the class
module.exports = Commander;
