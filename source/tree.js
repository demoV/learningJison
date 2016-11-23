var converter = require('number-to-words');
var maths = require('./mathFunctions');

var Tree = function(left, root, right) {
	this.value = [root, left, right];
	this.type = 'node';
}


Tree.prototype = {
	withPeranthesis: function() {
		var leftValue = toPeranthesis(this.value[1]);
		var rightValue = toPeranthesis(this.value[2]);
		return '(' + leftValue + this.value[0].sign + rightValue + ')';
	},
	representation: function() {
		var leftValue = toWords(this.value[1]);
		var rightValue = toWords(this.value[2]);
		var exp =  [ leftValue, this.value[0].asString, rightValue].join(' ');
		return  '(' + exp + ')';
	},
	evaluation: function(lookup) {
		lookup = lookup || {};
		lookup['_'] = this.evaluate(lookup);
		return lookup;
	},
	evaluate: function(lookup) {
		lookup = lookup || {};
		var left = this.value[1];
		var right = this.value[2];
		var operator = this.value[0]
		return operator(left, right, lookup)['_'];
	},
	isTypeof: function(type) {
		return type == this.type;
	}
}

var toPeranthesis = function(child) {
	if (child instanceof Tree) 
		return child.withPeranthesis();
	return child.evaluate();
}
var toWords = function(child) {
	if (child instanceof Tree)
	 	return child.representation()
	return converter.toWords(child.evaluate()) ;
}
module.exports = Tree;