var Tree = require('./tree.js');

var maths = {};

maths.add = function(a, b, lookup) {
	lookup['_'] = a.evaluate(lookup) + b.evaluate(lookup);
	return lookup;	
}

maths.equal = function(a, b, lookup) {
	if (typeof(b) == 'string') {
		lookup[a] = lookup[b];
	}
	else {
		lookup[a] = b;
	}

	return lookup;
}

maths.mul = function(a, b, lookup) {

}

module.exports = maths;