var Trees = function(left, right) {
	this.tree = [left, right];
}

Trees.prototype = {
	evaluate: function() {
		return this.tree.reduce(function(initial, node) {
			console.log(initial, 'initial')
			return node.evaluate(initial);
		}, {'_': undefined})['_']
	}
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