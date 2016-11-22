var converter = require('number-to-words');
var maths = require('./mathFunctions');

var Tree = function(left, root, right) {
	this.value = [root, left, right];
	this.type = '';
}


Tree.prototype = {
	withPeranthesis: function() {
		var leftValue = this.value[1] instanceof Tree  && this.value[1].withPeranthesis()  || this.value[1].evaluate();
		var rightValue = this.value[2] instanceof Tree  && this.value[2].withPeranthesis() || this.value[2].evaluate();
		return '(' + leftValue + this.value[0] + rightValue + ')';
	},
	representation: function() {
		var ops = {'+': 'plus', '-': 'minus', '*': 'times', '=': 'equal'};
		var left = this.value[1];
		var right = this.value[2];
		var leftValue = left instanceof Tree  && left.representation() || converter.toWords(left.evaluate()) ;

		var rightValue = right instanceof Tree &&  right.representation() || converter.toWords(right.evaluate());
		var exp =  [ leftValue, ops[this.value[0]], rightValue].join(' ');
		return  '(' + exp + ')';
	},
	evaluate: function(lookup) {
		lookup = lookup || {};
		return this.evaluation(lookup);
	},
	evaluation: function(lookup) {
		var operations = {'+': maths.add, '=': maths.equal};
		var left = this.value[1];
		var right = this.value[2];
		var operator = this.value[0]
		// var leftValue =  left.evaluate();
		// var	rightValue = right.evaluate();
		// console.log(JSON.stringify(leftValue), '---------', JSON.stringify(rightValue), "===", JSON.stringify(left))
		return operations[this.value[0]](left, right, lookup)['_'];
	},
	isTypeof: function(type) {
		return type == this.type;
	}
}

var valueOf = function(key, lookup) {
	lookup = lookup || {};
	if (lookup.hasOwnProperty(key)) {
		var value = lookup[key];
		if (value instanceof Tree) {
			return value.evaluation(lookup);
		}
		return value;
	}
	return key;
}
module.exports = Tree;