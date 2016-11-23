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
	},
	evaluation: function() {
		return this.evaluate();
	}
}

var AssignNode = function(variable) {
	this.variable = variable;
	this.value = undefined;
	this.type = 'assign';
}

AssignNode.prototype = {
	evaluation: function(lookup) {
		lookup[this.variable] = this.value.evaluate(lookup);
		return lookup;
	},
	addValue: function(value) {
		this.value = value;
		return this;
	},
	isTypeof: function(type) {
		return type == this.type;
	},
	getVariable: function() {
		return this.variable;
	},
	parent: function() {
		var p = this.getVariable();
		if (this.value != undefined && this.value.isTypeof('assign'))
			p = this.value.parent();
		return p;
	},
	evaluate: function(lookup) {
		var p = this.parent()
		return lookup[p]
	}
}

nodes.createAssign = function(variable) {
	return new AssignNode(variable);
};

nodes.createNumber = function(number) {
	return new NumberNode(number, 'number', function(){return this.value;})
};

module.exports = nodes;
