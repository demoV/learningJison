var nodes = require('../source/node.js');
var assert = require('assert');

describe('Assign node', function() {
	it('should evalute it self', function() {
		var lookupTable = {'a': 2};
		var node = nodes.createAssign('a');
		node.addValue(nodes.createNumber(2));
		var expected = 2;
		var actual = node.evaluate(lookupTable);
		assert.equal(expected, actual);
	});

	it('should give variables value if it is assigned by another varible', function() {
		var lookupTable = {'a': 2};
		var varB = nodes.createAssign('b');
		varB.addValue(nodes.createAssign('a'));

		var actual = varB.evaluate(lookupTable);
		assert.equal(2, actual);
	});

	it('should give variables value if it is assigned to multiple variables', function() {
		var lookupTable = {'a': 2};

		var varB = nodes.createAssign('b');
		varB.addValue(nodes.createAssign('a'));

		var varC = nodes.createAssign('c');
		varC.addValue(varB);	

		var actual = varC.evaluate(lookupTable);
		assert.equal(2, actual);
	});

	it('should give format of js', function() {
		var node = nodes.createAssign('a');
		node.addValue(nodes.createNumber(2));
		var expected = "a = 2";
		var actual = node.toJS();
		assert.equal(expected, actual);

	});


	it('should give js of multiple assienment', function() {
		var varB = nodes.createAssign('b');
		varB.addValue(nodes.createAssign('a'));
		var expected = 'b = a';
		var actual = varB.toJS();
		assert.equal(expected, actual);
	});



})