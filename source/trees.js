var Trees = function(left, root) {
	this.all = [root, left];
}


// var Node = function(value, type, eFunc) {
// 	this.value = value;
// 	this.type = type;
// 	this.evaluater = eFunc;
// }

// Node.prototype = {
// 	evaluate: function() {
// 		return this.evaluater(value);
// 	}
// }


// var assignNode = function() {

// }
// var createNumber = function(number) {
// 	return new Node(number, "Number", function(d){return d;})
// }

// var createOps = function(symbol, left, right) {
// 	var ops = {'+': function(){}, "-": function(){}};
// 	return new Node(symbol, "Ops", function() {
// 		return left.evaluate() + right.evaluate();
// 	});
// }
module.exports = Trees;