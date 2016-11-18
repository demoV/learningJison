var converter = require('number-to-words');

var Tree = function(root) {
	this.root = root;
	this.left = null;
	this.right = null;
}


Tree.prototype = {
	addToLeft: function(node) {
		this.left = node;
	},
	addToRight: function(node) {
		this.right = node;
	},
	toString: function() {
		return '(' + this.left + this.root + this.right + ')';
	},
	representation: function() {
		var ops = {'+': 'plus', '-': 'minus'};
		var leftValue = typeof(this.left) == 'number' && converter.toWords(this.left) || this.left.representation();
		var rightValue = typeof(this.left) == 'number' && converter.toWords(this.right) || this.right.representation();
		var exp =  [ leftValue, ops[this.root], rightValue].join(' ');
		return  '(' + exp + ')';
	}
}

module.exports = Tree;