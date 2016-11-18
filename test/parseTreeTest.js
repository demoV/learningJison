var Parser = require('jison').Parser;
var fs = require('fs');
var grammar = fs.readFileSync('./source/grammar.jison', 'utf8');
var assert = require('assert');

var p = new Parser(grammar);

describe('ParseTree', function() {
	it('should parse given string with parenthesis', function() {
		var actual = p.parse('1 + 2 + 3 + 4');
		var expected = '(((1+2)+3)+4)';
		assert.equal(expected, actual.withPeranthesis());
	});

	it('should parse 1 + 2 to (1 + 2) parenthesis', function() {
		var actual = p.parse('1 + 2');
		var expected = '(1+2)';
		assert.equal(expected, actual.withPeranthesis());
	});

	it('should parse 1 + 2 to (one plus two) parenthesis', function() {
		var actual = p.parse('1 + 2');
		var expected = '(one plus two)';
		assert.equal(expected, actual.representation());
	});

	it('should parse 1000000000+2 to (one billion plus two) parenthesis', function() {
		var actual = p.parse('1000000000 + 2');
		var expected = '(one billion plus two)';
		assert.equal(expected, actual.representation());
	});
});
