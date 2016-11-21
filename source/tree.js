var converter = require('number-to-words');
var maths = require('./mathFunctions');

var Tree = function(left, root, right) {
	this.value = [root, left, right];
}


Tree.prototype = {
	withPeranthesis: function() {
		var leftValue = typeof(this.value[1]) == 'number' && this.value[1] || this.value[1].withPeranthesis();
		var rightValue = typeof(this.value[2]) == 'number' && this.value[2] || this.value[2].withPeranthesis();
		return '(' + leftValue + this.value[0] + rightValue + ')';
	},
	representation: function() {
		var ops = {'+': 'plus', '-': 'minus', '*': 'times', '=': 'equal'};
		var left = this.value[1];
		var right = this.value[2];
		var leftValue = left instanceof Tree  && left.representation() || converter.toWords(left) ;

		var rightValue = right instanceof Tree &&  right.representation() || converter.toWords(right);
		var exp =  [ leftValue, ops[this.value[0]], rightValue].join(' ');
		return  '(' + exp + ')';
	},
	evaluate: function() {
		return this.evaluation(this.vars);
	},
	evaluation: function(lookup) {
		var operations = {'+': maths.add};
		var left = this.value[1];
		var right = this.value[2];
		var leftValue =  left instanceof Tree  && left.evaluation(lookup) || valueOf(left, lookup);
		var	rightValue = right instanceof Tree && right.evaluation(lookup) || valueOf(right, lookup);
		var a = {'_': null}
		return operations[this.value[0]](leftValue, rightValue, a);
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