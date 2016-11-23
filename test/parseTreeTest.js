var Parser = require('jison').Parser;
var fs = require('fs');

var grammar = fs.readFileSync('./source/grammar.jison', 'utf8');
var assert = require('assert');

var p = new Parser(grammar);

describe('ParseTree', function() {
	it('should parse given string with parenthesis', function() {
		var actual = p.parse('1 + 2 + 3 + 4;');
		var expected = '(((1+2)+3)+4)';
		assert.equal(expected, actual.withPeranthesis());
	});

	it('should parse 1 + 2 to (1 + 2) parenthesis', function() {
		var actual = p.parse('1 + 2;');
		var expected = '(1+2)';
		assert.equal(expected, actual.withPeranthesis());
	});

	it('should parse 1 + 2 to (one plus two) parenthesis', function() {
		var actual = p.parse('1 + 2;');
		var expected = '(one plus two)';
		assert.equal(expected, actual.representation());
	});

	it('should parse 1000000000+2 to (one billion plus two) parenthesis', function() {
		var actual = p.parse('1000000000 + 2;');
		var expected = '(one billion plus two)';
		assert.equal(expected, actual.representation());
	});

	it('should parse 1000000000 * 2 to (one billion times two) parenthesis', function() {
		var actual = p.parse('1000000000 * 2;');
		var expected = '(one billion times two)';
		assert.equal(expected, actual.representation());
	});

	it('should parse 1000000000 - 2 to (one billion minus two) parenthesis', function() {
		var actual = p.parse('1000000000 - 2;');
		var expected = '(one billion minus two)';
		assert.equal(expected, actual.representation());
	});

	// it('should parse a = 2 to (a equal two)', function() {
	// 	var actual = p.parse('a = 2;').representation();
	// 	var expected = '(a equal two)';
	// 	assert.equal(expected, actual);
	// }); 

	it('should evaluate 1 + 2 as 3', function() {
		var actual = p.parse('1 + 2;').evaluate();
		var expected = 3;
		assert.equal(expected, actual);
	});

	it('should evaluate 1 + 2 + 4 as 3', function() {
		var actual = p.parse('1 + 2 + 4;');
		var expected = 7;
		assert.equal(expected, actual.evaluate());
	});

	it('should evaluate complex expresion ', function() {
		var actual = p.parse('a=10+2+1; a=a+1;').evaluate();
		var expected = 14;
		assert.equal(expected, actual);
	});

	it('should evaluating complex expresion ', function() {
		var actual = p.parse('a=10+2+1; a=a+1; b=a+6;').evaluate();
		var expected = 20;
		assert.equal(expected, actual);
	});

	it('should evaluate complex assignment ', function() {
		var actual = p.parse('a=10+2+1; a=a+1; b=a+6; c=b+10;').evaluate();
		var expected = 30;
		assert.equal(expected, actual);
	});

	it('should evaluate complex assignment with multiple variable', function() {
		var actual = p.parse('a=10+2+1; a=a+1; b=a+6; c=b+10;').evaluate();
		var expected = 30;
		assert.equal(expected, actual);
	});

	it('should evaluate multiply operations', function() {
		var actual = p.parse('a=10+2+1; a=a+1; b=a+6; c=b*10;').evaluate();
		var expected = 200;
		assert.equal(expected, actual);
	});

	it('should evaluate power operations', function() {
		var actual = p.parse('a=10+2+1; a=a+1; b=a+6; c=b^2;').evaluate();
		var expected = 400;
		assert.equal(expected, actual);
	});
});
