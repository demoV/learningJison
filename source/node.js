var nodes = {};

var NumberNode = function(value, type, eFunc) {
	this.value = value;
	this.type = type;
	this.evaluater = eFunc;
}

NumberNode.prototype = {
	evaluate: function() {
		return this.evaluater(this.value);
	},
	isTypeof: function(type) {
		return type == this.type;
	}
}

var AssignNode = function(variable) {
	this.variable = variable;
	this.value = undefined;
	this.type = 'assign';
}

AssignNode.prototype = {
	evaluate: function(lookup) {
		lookup[this.variable] = this.value;
	},
	addValue: function(value) {
		this.value = value;
		return this;
	},
	isTypeof: function(type) {
		return type == this.type;
	}
}

nodes.createAssign = function(variable) {
	console.log('hey i mher')
	return new AssignNode(variable);
};

nodes.createNumber = function(number) {
	return new NumberNode(number, 'number', function(){return this.value;})
};

module.exports = nodes;
