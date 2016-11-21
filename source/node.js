var nodes = {};

var Node = function(value, type, eFunc) {
	this.value = value;
	this.type = type;
	this.evaluater = eFunc;
}

Node.prototype = {
	evaluate: function() {
		return this.evaluater(this.value);
	}
}


nodes.assignNode = function() {};

nodes.createNumber = function(number) {
	return new Node(number, Number, function(){return this.value;})
};

nodes.createOps = function(symbol, left, right) {
	var ops = {'+': function(){}, "-": function(){}};
	return new Node(symbol, "Ops", function() {
		return left.evaluate() + right.evaluate();
	});
};

module.exports = nodes;
